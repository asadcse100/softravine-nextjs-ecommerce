import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAffiliateUsers = async () => {
  try{
      const affiliate_users = await prisma.affiliate_users.findMany();
      return { success: true, data: affiliate_users };
  }catch(error){
      console.error("Error fetching affiliate_users:", error);
      return { success: false, error };
  }
}

export const getReferralUsers = async () => {
  try{
      const getReferralUsers = await prisma.affiliate_users.findMany();
      return { success: true, data: getReferralUsers };
  }catch(error){
      console.error("Error fetching getReferralUsers:", error);
      return { success: false, error };
  }
}

export const getWithdrawRequestUsers = async () => {
  try{
      const getWithdrawRequestUsers = await prisma.affiliate_payments.findMany();
      return { success: true, data: getWithdrawRequestUsers };
  }catch(error){
      console.error("Error fetching getWithdrawRequestUsers:", error);
      return { success: false, error };
  }
}

export const getLogs = async () => {
  try{
      const getLogs = await prisma.affiliate_logs.findMany();
      return { success: true, data: getLogs };
  }catch(error){
      console.error("Error fetching getLogs:", error);
      return { success: false, error };
  }
}

export const affiliateOptionStore = async (req: NextRequest) => {
  const { type, percentage, amount, amount_type, status } = await req.json();

  let affiliateOption = await prisma.affiliateOption.findFirst({ where: { type } });
  if (!affiliateOption) {
    affiliateOption = await prisma.affiliateOption.create({
      data: { type, details: {}, status: false },
    });
  }

  let commissionDetails: any = {};

  switch (type) {
    case 'user_registration_first_purchase':
      affiliateOption.percentage = percentage;
      break;

    case 'product_sharing':
      commissionDetails = { commission: amount, commission_type: amount_type };
      break;

    case 'category_wise_affiliate':
      commissionDetails = await Promise.all(
        (await prisma.category.findMany()).map(async (category) => ({
          category_id: req.body[`categories_id_${category.id}`],
          commission: req.body[`commison_amounts_${category.id}`],
          commission_type: req.body[`commison_types_${category.id}`],
        }))
      );
      break;

    case 'max_affiliate_limit':
      affiliateOption.percentage = percentage;
      break;

    default:
      break;
  }

  affiliateOption.details = commissionDetails;

  if (status) {
    affiliateOption.status = true;
    if (type === 'product_sharing') {
      await prisma.affiliateOption.updateMany({
        where: { type: 'category_wise_affiliate' },
        data: { status: false },
      });
    } else if (type === 'category_wise_affiliate') {
      await prisma.affiliateOption.updateMany({
        where: { type: 'product_sharing' },
        data: { status: false },
      });
    }
  } else {
    affiliateOption.status = false;
  }

  await prisma.affiliateOption.update({
    where: { id: affiliateOption.id },
    data: affiliateOption,
  });

  return NextResponse.json({ message: "This has been updated successfully" });
};

export const configStore = async (req: NextRequest) => {
  const { type } = await req.json();

  if (type === 'validation_time') {
    let affiliateConfig = await prisma.affiliateConfig.findFirst({ where: { type } });
    if (!affiliateConfig) {
      affiliateConfig = await prisma.affiliateConfig.create({ data: { type, value: {} } });
    }

    affiliateConfig.value = req.body[type];
    await prisma.affiliateConfig.update({ where: { id: affiliateConfig.id }, data: affiliateConfig });

    return NextResponse.json({ message: "Validation time updated successfully" });
  } else {
    const form: any[] = [];
    const selectTypes = ['select', 'multi_select', 'radio'];
    let j = 0;

    for (let i = 0; i < req.body.type.length; i++) {
      const item: any = {
        type: req.body.type[i],
        label: req.body.label[i],
      };

      if (selectTypes.includes(req.body.type[i])) {
        item.options = JSON.stringify(req.body[`options_${req.body.option[j]}`]);
        j++;
      }

      form.push(item);
    }

    let affiliateConfig = await prisma.affiliateConfig.findFirst({ where: { type: 'verification_form' } });
    if (!affiliateConfig) {
      affiliateConfig = await prisma.affiliateConfig.create({ data: { type: 'verification_form', value: {} } });
    }

    affiliateConfig.value = JSON.stringify(form);
    await prisma.affiliateConfig.update({ where: { id: affiliateConfig.id }, data: affiliateConfig });

    return NextResponse.json({ message: "Verification form updated successfully" });
  }
};

export const storeAffiliateUser = async (req: NextRequest) => {
  const session = await getSession({ req });

  if (!session) {
    const existingUser = await prisma.user.findUnique({ where: { email: req.body.email } });
    if (existingUser) {
      return NextResponse.json({ error: 'Email already exists!' }, { status: 400 });
    }

    if (req.body.password !== req.body.password_confirmation) {
      return NextResponse.json({ error: 'Password did not match.' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        user_type: 'customer',
        password: hashedPassword,
      },
    });

    // You can implement authentication logic here, e.g., using NextAuth.js signIn

    if (process.env.EMAIL_VERIFICATION !== '1') {
      await prisma.user.update({
        where: { id: user.id },
        data: { email_verified_at: new Date() },
      });
    } else {
      // Trigger email verification event
    }
  }

  const userId = session ? session.userId : user.id;
  let affiliateUser = await prisma.affiliateUser.findUnique({ where: { userId } });

  if (!affiliateUser) {
    affiliateUser = await prisma.affiliateUser.create({ data: { userId, informations: [] } });
  }

  const config = await prisma.affiliateConfig.findUnique({ where: { type: 'verification_form' } });
  const formData = JSON.parse(config.value);
  const data = formData.map((element: any, index: number) => {
    const item: any = {
      type: element.type,
      label: element.label,
      value: req.body[`element_${index}`],
    };

    if (element.type === 'multi_select') {
      item.value = JSON.stringify(req.body[`element_${index}`]);
    } else if (element.type === 'file') {
      // Handle file upload
      const file = req.body[`element_${index}`];
      const filePath = `/uploads/affiliate_verification_form/${file.name}`;
      // Save file to filePath
      item.value = filePath;
    }

    return item;
  });

  await prisma.affiliateUser.update({
    where: { userId },
    data: { informations: JSON.stringify(data) },
  });

  return NextResponse.json({ message: 'Your verification request has been submitted successfully!' }, { status: 200 });
};
