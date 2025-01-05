"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
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
import Breadcrumb from "@/app/admin/components/Breadcrumbs/Breadcrumb";
import { showErrorToast, showSuccessToast } from "@/app/admin/components/Toast";

const leadershipFormSchema = z.object({
  leaderships: z.array(
    z.object({
      leadership_name: z.string(),
      direct_account_required: z.string(),
      team_account_required: z.string(),
      total_account_included_team: z.string(),
      leadership_award: z.string(),
      monthly_reword_fund: z.string(),
      mobile_recharged: z.string(),
      drivepack_recharged: z.string(),
      reseller_shop_ordered: z.string(),
    })
  )
});

const referralFormSchema = z.object({
  referrals: z.array(z.string())
});

const formSchema = z.object({
  amount: z.string().min(3, {
    message: "Product Name must be at least 3 characters.",
  }),
  validation_time: z.string(),
});

export default function AddOrEdit() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
    },
  });

  // Fetch data if editing an existing ticket
  useEffect(() => {
    if (id) {
      const fetchTicket = async () => {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
          const response = await fetch(`${apiUrl}/server/api/routes/admin/affiliate/configuration/${id}`);
          const data = await response.json();
          form.reset(data); // Populate form with existing data
        } catch (error) {
          showErrorToast("Failed to fetch blog category data.");
        }
      };
      fetchTicket();
    }
  }, [id, form]);

  const [leadershipFields, setLeadershipFields] = useState([
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

  const [referralFields, setReferralFields] = useState([{ value: "" }]);

  const leadershipForm = useForm({
    resolver: zodResolver(leadershipFormSchema),
    defaultValues: {
      leaderships: leadershipFields,
    },
  });

  const referralForm = useForm({
    resolver: zodResolver(referralFormSchema),
    defaultValues: {
      referrals: referralFields.map(field => field.value),
    },
  });

  const handleAddLeadershipField = () => {
    setLeadershipFields([
      ...leadershipFields,
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

  const handleAddReferralField = () => {
    setReferralFields([...referralFields, { value: "" }]);
  };

  const handleReferralInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newFields = [...referralFields];
    newFields[index].value = event.target.value;
    setReferralFields(newFields);
  };

  const onSubmitLeadership = (values: z.infer<typeof leadershipFormSchema>) => {
    console.log("Leadership Form Values:", values);
  };

  const onSubmitReferral = (values: z.infer<typeof referralFormSchema>) => {
    console.log("Referral Form Values:", values);
  };

  // function onSubmit(values: z.infer<typeof formSchema>) {
  const onSubmit: SubmitHandler<FormData> = async (values) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      showErrorToast("API URL is not configured.");
      return;
    }

    setIsLoading(true);

    if (!apiUrl) {
      showErrorToast("API URL is not configured.");
      return;
    }

    try {
      // const response = await fetch(`${apiUrl}/server/api/routes/admin/affiliate/configuration`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(values),
      // });

      const method = id ? "PUT" : "POST";
      const url = id
        ? `${apiUrl}/server/api/routes/admin/affiliate/configuration/${id}`
        : `${apiUrl}/server/api/routes/admin/affiliate/configuration`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add affiliate configuration. Please try again.");
      }

      const result = await response.json();

      showSuccessToast(result.message || "affiliate configuration added successfully!");
      router.push("/admin/pages/affiliate/configuration");
    } catch (error) {
      showErrorToast("Error adding affiliate configuration: " + (error instanceof Error ? error.message : "Unknown error"));
    }
  }

  const inputClass = "bg-zinc-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-900 dark:border-slate-700 dark:placeholder-slate-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

  const referralClass = "py-3 px-4 block w-full border-gray-200 shadow-sm rounded-0 text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
  return (
    <div className="min-h-screen mx-auto max-w-screen-2xl mt-2 p-4 py-4 md:p-6 2xl:p-10 bg-slate-100 dark:bg-slate-900">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="mx-auto max-w-screen-2xl">
            <div className="mb-3 flex flex-row items-center justify-between gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Breadcrumb pageName="Affiliate Configuration" />
            </div>
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 sm:grid-cols-1">
              <div className="flex flex-col gap-4">
                <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      {id ? "Edit Affiliate withdrow request" : "Add Affiliate withdrow request"}
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="flex flex-col gap-5.5 p-6.5">
                      {[
                        { name: "minimum_withdraw", label: "Minimum Withdraw" },
                      ].map((field) => (
                        <div
                          key={field.name}
                          className="mt-3 flex flex-col gap-5.5 p-6.5"
                        >
                          <FormField
                            control={form.control}
                            name={field.name}
                            render={({ field: fieldProps }) => (
                              <FormItem>
                                <div className="grid grid-cols-1 md:grid-cols-12">
                                  <div className="col-span-3 mt-1">
                                    <FormLabel>{field.label}</FormLabel>
                                  </div>
                                  <div className="col-span-8">
                                    <FormControl>
                                      {field.name === "minimum_withdraw" ? (
                                        <Input type="text"
                                          className={inputClass}
                                          placeholder={field.label}
                                          {...fieldProps}
                                        />
                                      ) : null}

                                    </FormControl>
                                  </div>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      ))}
                      {/* <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                          <FormItem>
                            <div className="grid grid-cols-1 md:grid-cols-12">
                              <div className="col-span-3 mt-2">
                                <FormLabel>Minimum Withdraw</FormLabel>
                              </div>
                              <div className="col-span-8">
                                <FormControl>
                                  <Input
                                    className={inputClass}
                                    placeholder="Minimum Withdrow Amount"
                                    {...field}
                                  />
                                </FormControl>
                              </div>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      /> */}
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
                      {[
                        { name: "validation_time", label: "Validation Time" },
                      ].map((field) => (
                        <div
                          key={field.name}
                          className="mt-3 flex flex-col gap-5.5 p-6.5"
                        >
                          <FormField
                            control={form.control}
                            name={field.name}
                            render={({ field: fieldProps }) => (
                              <FormItem>
                                <div className="grid grid-cols-1 md:grid-cols-12">
                                  <div className="col-span-3 mt-1">
                                    <FormLabel>{field.label}</FormLabel>
                                  </div>
                                  <div className="col-span-8">
                                    <FormControl>
                                      {field.name === "validation_time" ? (
                                        <Input type="text"
                                          className={inputClass}
                                          placeholder={field.label}
                                          {...fieldProps}
                                        />
                                      ) : null}

                                    </FormControl>
                                  </div>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      ))}

                      {/* <FormField
                        control={form.control}
                        name="validation_time"
                        render={({ field }) => (
                          <FormItem>
                            <div className="grid grid-cols-1 md:grid-cols-12">
                              <div className="col-span-3 mt-2">
                                <FormLabel>Validation Time</FormLabel>
                              </div>
                              <div className="col-span-8">
                                <FormControl>
                                  <Input
                                    className={inputClass}
                                    placeholder="Validation Time"
                                    {...field}
                                  />
                                </FormControl>
                              </div>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      /> */}
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
                      Referral User Configuration
                    </h3>
                  </div>
                  <div className="py-6">
                    <div className="flex flex-col gap-5.5 p-6.5">

                      {referralFields.map((field, index) => (
                        <div key={index} className="mt-3 flex flex-col gap-5.5 p-6.5">
                          <FormField
                            control={form.control}
                            name={`amount-${index}`}
                            render={({ field: fieldProps }) => (
                              <FormItem>
                                <div className="grid grid-cols-1 md:grid-cols-12">
                                  <div className="col-span-3 mt-2">
                                    <FormLabel>{field.label || `Channel ${index + 1}`}</FormLabel>
                                  </div>
                                  <div className="col-span-8">
                                    <FormControl>
                                      <Input
                                        className={inputClass}
                                        placeholder="%"
                                        value={fieldProps.value}
                                        onChange={(event) => handleInputChange(index, event)}
                                        {...fieldProps}
                                      />
                                    </FormControl>
                                  </div>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      ))}


                      {/* {referralFields.map((field, index) => (
                        <FormField
                          key={index}
                          control={form.control}
                          name={`amount-${index}`}
                          render={({ field }) => (
                            <FormItem>
                              <div className="grid grid-cols-1 md:grid-cols-12">
                                <div className="col-span-3 mt-2">
                                  <FormLabel>Channel {index + 1}</FormLabel>
                                </div>
                                <div className="col-span-8">
                                  <FormControl>
                                    <Input
                                      className={inputClass}
                                      placeholder="%"
                                      value={field.value}
                                      onChange={(event) => handleInputChange(index, event)}
                                      {...field}
                                    />
                                  </FormControl>
                                </div>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))} */}

                      <Button
                        className="mt-4 p-2 dark:text-slate-200"
                        onClick={handleAddReferralField}
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
                  <form onSubmit={onSubmitLeadership(onSubmit)}>
                    <div className="py-6">

                      {leadershipFields.map((field, index) => (
                        <div key={index} className="flex flex-col gap-5.5 p-6.5 border border-slate-500 p-2 mt-2">

                          {[
                            { name: "leadership_name", label: "Leadership Name", place: "10" },
                            { name: "direct_account_required", label: "Direct account is required", place: "0" },
                            { name: "team_account_required", label: "Team account is required", place: "10" },
                            { name: "total_account_included_team", label: "Total accounts including teams", place: "10" },
                            { name: "leadership_award", label: "Leadership Awards", place: "70%" },
                            { name: "monthly_reword_fund", label: "Monthly Rewards fund", place: "15%" },
                            { name: "mobile_recharged", label: "Mobile should be recharged", place: "200" },
                            { name: "drivepack_recharged", label: "Driverpack Should be recharged", place: "500" },
                            { name: "reseller_shop_ordered", label: "Reseller shop should be ordered", place: "100" },
                          ].map((fieldData) => (
                            <div key={fieldData.name} className="mt-3 flex flex-col gap-5.5">
                              <Controller
                                control={leadershipForm.control}
                                name={`leaderships.${index}.${fieldData.name}`}
                                render={({ field: fieldProps }) => (
                                  <FormItem>
                                    <div className="grid grid-cols-1 md:grid-cols-12">
                                      <div className="col-span-4 mt-1">
                                        <FormLabel>{fieldData.label}</FormLabel>
                                      </div>
                                      <div className="col-span-8">
                                        <FormControl>
                                          <Input
                                            className={inputClass}
                                            placeholder={fieldData.place}
                                            {...fieldProps}
                                          />
                                        </FormControl>
                                      </div>
                                    </div>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          ))}

                          {/* <Controller
                            control={leadershipForm.control}
                            name={`leaderships.${index}.leadership_name`}
                            render={({ field }) => (
                              <FormItem>
                                <div className="grid grid-cols-1 md:grid-cols-12">
                                  <div className="col-span-4 mt-2">
                                    <FormLabel>Leadership Name</FormLabel>
                                  </div>
                                  <div className="col-span-8">
                                    <FormControl>
                                      <Input
                                        className={inputClass}
                                        placeholder="10"
                                        {...field}
                                      />
                                    </FormControl>
                                  </div>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          /> */}




                          {/* <Controller
                            control={leadershipForm.control}
                            name={`leaderships.${index}.direct_account_required`}
                            render={({ field }) => (
                              <FormItem>
                                <div className="grid grid-cols-1 md:grid-cols-12">
                                  <div className="col-span-4 mt-2">
                                    <FormLabel>Direct account is required</FormLabel>
                                  </div>
                                  <div className="col-span-8">
                                    <FormControl>
                                      <Input
                                        className={inputClass}
                                        placeholder="0"
                                        {...field}
                                      />
                                    </FormControl>
                                  </div>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          /> */}

                          {/* <Controller
                            control={leadershipForm.control}
                            name={`leaderships.${index}.team_account_required`}
                            render={({ field }) => (
                              <FormItem>
                                <div className="grid grid-cols-1 md:grid-cols-12">
                                  <div className="col-span-4 mt-2">
                                    <FormLabel>Team account is required</FormLabel>
                                  </div>
                                  <div className="col-span-8">
                                    <FormControl>
                                      <Input
                                        className={inputClass}
                                        placeholder="10"
                                        {...field}
                                      />
                                    </FormControl>
                                  </div>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          /> */}

                          {/* <Controller
                            control={leadershipForm.control}
                            name={`leaderships.${index}.total_account_included_team`}
                            render={({ field }) => (
                              <FormItem>
                                <div className="grid grid-cols-1 md:grid-cols-12">
                                  <div className="col-span-4 mt-2">
                                    <FormLabel>Total accounts including teams</FormLabel>
                                  </div>
                                  <div className="col-span-8">
                                    <FormControl>
                                      <Input
                                        className={inputClass}
                                        placeholder="10"
                                        {...field}
                                      />
                                    </FormControl>
                                  </div>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          /> */}

                          {/* <Controller
                            control={leadershipForm.control}
                            name={`leaderships.${index}.leadership_award`}
                            render={({ field }) => (
                              <FormItem>
                                <div className="grid grid-cols-1 md:grid-cols-12">
                                  <div className="col-span-4 mt-2">
                                    <FormLabel>Leadership Awards</FormLabel>
                                  </div>
                                  <div className="col-span-8">
                                    <FormControl>
                                      <Input
                                        className={inputClass}
                                        placeholder="70%"
                                        {...field}
                                      />
                                    </FormControl>
                                  </div>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          /> */}
{/* 
                          <Controller
                            control={leadershipForm.control}
                            name={`leaderships.${index}.monthly_reword_fund`}
                            render={({ field }) => (
                              <FormItem>
                                <div className="grid grid-cols-1 md:grid-cols-12">
                                  <div className="col-span-4 mt-2">
                                    <FormLabel>Monthly Rewards fund</FormLabel>
                                  </div>
                                  <div className="col-span-8">
                                    <FormControl>
                                      <Input
                                        className={inputClass}
                                        placeholder="15%"
                                        {...field}
                                      />
                                    </FormControl>
                                  </div>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          /> */}

                          {/* <Controller
                            control={leadershipForm.control}
                            name={`leaderships.${index}.mobile_recharged`}
                            render={({ field }) => (
                              <FormItem>
                                <div className="grid grid-cols-1 md:grid-cols-12">
                                  <div className="col-span-4 mt-2">
                                    <FormLabel>Mobile should be recharged</FormLabel>
                                  </div>
                                  <div className="col-span-8">
                                    <FormControl>
                                      <Input
                                        className={inputClass}
                                        placeholder="200"
                                        {...field}
                                      />
                                    </FormControl>
                                  </div>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          /> */}

                          {/* <Controller
                            control={leadershipForm.control}
                            name={`leaderships.${index}.drivepack_recharged`}
                            render={({ field }) => (
                              <FormItem>
                                <div className="grid grid-cols-1 md:grid-cols-12">
                                  <div className="col-span-4 mt-2">
                                    <FormLabel>Driverpack Should be recharged</FormLabel>
                                  </div>
                                  <div className="col-span-8">
                                    <FormControl>
                                      <Input
                                        className={inputClass}
                                        placeholder="500"
                                        {...field}
                                      />
                                    </FormControl>
                                  </div>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          /> */}

                          {/* <Controller
                            control={leadershipForm.control}
                            name={`leaderships.${index}.reseller_shop_ordered`}
                            render={({ field }) => (
                              <FormItem>
                                <div className="grid grid-cols-1 md:grid-cols-12">
                                  <div className="col-span-4 mt-2">
                                    <FormLabel>Reseller shop should be ordered</FormLabel>
                                  </div>
                                  <div className="col-span-8">
                                    <FormControl>
                                      <Input
                                        className={inputClass}
                                        placeholder="100"
                                        {...field}
                                      />
                                    </FormControl>
                                  </div>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          /> */}
                        </div>
                      ))}

                      <Button
                        className="mt-4 p-2 dark:text-slate-200"
                        onClick={handleAddLeadershipField}
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
                          disabled={isLoading}
                        >
                          {isLoading ? "Submitting..." : "Submit"}
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
