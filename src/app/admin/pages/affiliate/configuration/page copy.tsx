"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { useState } from 'react';
import { Button } from "@/app/admin/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/admin/components/ui/form";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import { Switch } from "@/app/admin/components/ui/switch";

const formSchema = z.object({
  amount: z.string().min(10, {
    message: "Product Name must be at least 10 characters.",
  }),
});


interface Field {
  value: string;
}

interface LeadershipForm {
  leaderships: {
    leadership_name: string;
    direct_account_required: string;
    team_account_required: string;
    total_account_included_team: string;
    leadership_award: string;
    monthly_reword_fund: string;
    mobile_recharged: string;
    drivepack_recharged: string;
    reseller_shop_ordered: string;
  }[];
}


export default function Addnew() {
  // ...
  const [fields, setFields] = useState<Field[]>([{ value: '' }]);

  const [fields, setFields] = useState([
    {
      leadership_name: "",
      direct_account_required: "",
      team_account_required: "",
      total_account_included_team: "",
      leadership_award: "",
      monthly_reword_fund: "",
      mobile_recharged: "",
      drivepack_recharged: "",
      reseller_shop_ordered: "",
    },
  ]);

  const handleAddField = () => {
    setFields([...fields, { value: '' }]);
    setFields([
      ...fields,
      {
        leadership_name: "",
        direct_account_required: "",
        team_account_required: "",
        total_account_included_team: "",
        leadership_award: "",
        monthly_reword_fund: "",
        mobile_recharged: "",
        drivepack_recharged: "",
        reseller_shop_ordered: "",
      },
    ]);
  };

  const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newFields = [...fields];
    newFields[index].value = event.target.value;
    setFields(newFields);
  };
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
    },
  });

  const { control, handleSubmit } = useForm<LeadershipForm>({
    defaultValues: {
      leaderships: [
        {
          leadership_name: "",
          direct_account_required: "",
          team_account_required: "",
          total_account_included_team: "",
          leadership_award: "",
          monthly_reword_fund: "",
          mobile_recharged: "",
          drivepack_recharged: "",
          reseller_shop_ordered: "",
        },
      ],
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }


  const inputClass =
    "w-full rounded-lg border-[1px] border-primary bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white";

  const referralClass = "py-3 px-4 block w-full border-gray-200 shadow-sm rounded-0 text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
  return (
    <div className="min-h-screen mx-auto max-w-screen-2xl mt-4 p-4 py-4 md:p-6 2xl:p-10 bg-slate-100 dark:bg-slate-900">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="mx-auto max-w-screen-2xl">
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 sm:grid-cols-1">

  



              <div className="flex flex-col gap-4">
                <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      Affiliate withdrow request
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Minimum Affiliate Withdrow Amount
                            </FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="100"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid mt-3 justify-items-end">
                      <Button
                        className="dark:text-slate-200"
                        variant="outline"
                        type="submit"
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      Affiliate Link Validatin Time (Days)
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="product_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Validation Time</FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="100"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid mt-3 justify-items-end">
                      <Button
                        className="dark:text-slate-200"
                        variant="outline"
                        type="submit"
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      Basic Affiliate
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="product_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              User Registration & First Purchase
                            </FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="100"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="product_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="flex mt-4 items-center space-x-12">
                                <FormLabel className="mt-2">Status</FormLabel>
                                <Switch />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid mt-3 justify-items-end">
                      <Button
                        className="dark:text-slate-200"
                        variant="outline"
                        type="submit"
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      Product Sharing Affiliate
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="product_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Product Sharing and Purchasing
                            </FormLabel>
                            <FormControl>
                              <Input
                                className={inputClass}
                                placeholder="100"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="product_name"
                        render={({ field }) => (
                          <FormItem>
                            {/* <FormLabel>
                            Product Sharing and Purchasing
                            </FormLabel> */}
                            <FormControl>
                              <Select>
                                <option>%</option>
                                <option>$</option>
                              </Select>
                              {/* <Input
                                className={inputClass}
                                placeholder="100"
                                {...field}
                              /> */}
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FormField
                        control={form.control}
                        name="product_name"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex mt-4 items-center space-x-12">
                              <FormLabel className="mt-2">Status</FormLabel>
                              <Switch />
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid mt-3 justify-items-end">
                      <Button
                        className="dark:text-slate-200"
                        variant="outline"
                        type="submit"
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-1 sm:grid-cols-2">
                <div className="flex flex-col gap-4">
                  <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        Product Sharing Affiliate (Category Wise)
                      </h3>
                    </div>
                    <div className="py-6">
                      <div className="flex flex-col gap-5.5 p-6.5">
                        <FormField
                          control={form.control}
                          name="gallery_images"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex items-center space-x-12">
                                <FormLabel className="mt-2">Status</FormLabel>
                                <Switch />
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="mt-3 flex flex-col gap-5.5 p-6.5">
                        <FormField
                          control={form.control}
                          name="thumbnail_image"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Women Clothing & Fashion</FormLabel>
                              <FormControl>
                                <Input
                                  className={inputClass}
                                  placeholder="2"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="thumbnail_image"
                          render={({ field }) => (
                            <FormItem>
                              {/* <FormLabel>Women Clothing & Fashion</FormLabel> */}
                              <FormControl>
                                <Select>
                                  <option>%</option>
                                  <option>$</option>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid mt-3 justify-items-end">
                        <Button
                          className="dark:text-slate-200"
                          variant="outline"
                          type="submit"
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      Referral User Configuration
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="flex flex-col gap-5.5 p-6.5">
                      {fields.map((field, index) => (
                        <FormField
                          key={index}
                          control={form.control}
                          name={`amount-${index}`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Channel {index + 1}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className={inputClass}
                                  placeholder="%"
                                  value={field.value}
                                  onChange={(event) => handleInputChange(index, event)}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}

                      <Button
                        className="mt-4 p-2 dark:text-slate-200"
                        onClick={handleAddField}
                        variant="outline"
                        type="button"
                      >
                        + Add New
                      </Button>

                    </div>
                    <div className="grid mt-3 justify-items-end">
                      <Button
                        className="dark:text-slate-200"
                        variant="outline"
                        type="submit"
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              

              <div className="flex flex-col gap-4">
      <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Leadership Configuration
          </h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="py-6">
            {fields.map((field, index) => (
              <div key={index} className="flex flex-col gap-5.5 p-6.5">
                <Controller
                  control={control}
                  name={`leaderships.${index}.leadership_name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Leadership Name</FormLabel>
                      <FormControl>
                        <Input
                          className="inputClass"
                          placeholder="Creative leadership"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Controller
                  control={control}
                  name={`leaderships.${index}.direct_account_required`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Direct account is required</FormLabel>
                      <FormControl>
                        <Input
                          className="inputClass"
                          placeholder="10"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Controller
                  control={control}
                  name={`leaderships.${index}.team_account_required`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Team account is required</FormLabel>
                      <FormControl>
                        <Input
                          className="inputClass"
                          placeholder="10"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Controller
                  control={control}
                  name={`leaderships.${index}.total_account_included_team`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total accounts including teams</FormLabel>
                      <FormControl>
                        <Input
                          className="inputClass"
                          placeholder="10"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Controller
                  control={control}
                  name={`leaderships.${index}.leadership_award`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Leadership Awards</FormLabel>
                      <FormControl>
                        <Input
                          className="inputClass"
                          placeholder="70%"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Controller
                  control={control}
                  name={`leaderships.${index}.monthly_reword_fund`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monthly Rewards fund</FormLabel>
                      <FormControl>
                        <Input
                          className="inputClass"
                          placeholder="15%"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Controller
                  control={control}
                  name={`leaderships.${index}.mobile_recharged`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile should be recharged</FormLabel>
                      <FormControl>
                        <Input
                          className="inputClass"
                          placeholder="200"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Controller
                  control={control}
                  name={`leaderships.${index}.drivepack_recharged`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Driverpack Should be recharged</FormLabel>
                      <FormControl>
                        <Input
                          className="inputClass"
                          placeholder="500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Controller
                  control={control}
                  name={`leaderships.${index}.reseller_shop_ordered`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reseller shop should be ordered</FormLabel>
                      <FormControl>
                        <Input
                          className="inputClass"
                          placeholder="100"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}

            <Button
              className="mt-4 p-2 dark:text-slate-200"
              onClick={handleAddField}
              variant="outline"
              type="button"
            >
              + Add New
            </Button>

            <div className="grid mt-3 justify-items-end">
              <Button
                className="dark:text-slate-200"
                variant="outline"
                type="submit"
              >
                Save
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>

            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
