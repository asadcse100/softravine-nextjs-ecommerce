"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import Breadcrumb from "@/app/admin/components/Breadcrumbs/Breadcrumb";
import { Button } from "@/app/admin/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/admin/components/ui/form";
import Input from "@/shared/Input/Input";
import { showErrorToast, showSuccessToast } from "@/app/admin/components/Toast";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const formSchema = z.object({
  where_from: z.string().min(1, { message: "Please select where from." }),
  where_to: z.string().min(1, { message: "Please select where to." }),
  travel_date: z.string().min(1, { message: "Please select travel date." }),
  // return_date: z
  //   .string()
  //   .optional()
  //   .refine(
  //     (date, ctx) => !date || new Date(date) > new Date(ctx.parent.travel_date),
  //     { message: "Return date must be after travel date." }
  //   ),
  ticket_category: z.string().optional(),
  passenger_number: z.string().optional(),
});

export default function AddOrEdit() {

  const router = useRouter();
  const searchParams = useSearchParams();
  const ticketId = searchParams.get('id');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      where_from: "",
      where_to: "",
      travel_date: "",
      // return_date: "",
      ticket_category: "",
      passenger_number: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  // Fetch data if editing an existing ticket
  useEffect(() => {
    if (ticketId) {
      const fetchTicket = async () => {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
          const response = await fetch(`${apiUrl}/server/api/routes/admin/my_bis_option/air_ticket/${ticketId}`);
          const data = await response.json();
          form.reset(data); // Populate form with existing data
        } catch (error) {
          showErrorToast("Failed to fetch ticket data.");
        }
      };
      fetchTicket();
    }
  }, [ticketId, form]);

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (values) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";

    if (!apiUrl) {
      showErrorToast("API URL is not configured.");
      return;
    }

    setIsLoading(true);

    try {
      const method = ticketId ? "PUT" : "POST";
      const url = ticketId
        ? `${apiUrl}/server/api/routes/admin/my_bis_option/air_ticket/${ticketId}`
        : `${apiUrl}/server/api/routes/admin/my_bis_option/air_ticket`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to save air ticket. Please try again.");
      }

      const result = await response.json();
      showSuccessToast(result.message || "Air ticket saved successfully!");
      router.push("/admin/pages/my_bis_option/air_ticket");
    } catch (error) {
      showErrorToast("Error saving air ticket: " + (error instanceof Error ? error.message : "Unknown error"));
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    "bg-zinc-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-900 dark:border-slate-700 dark:placeholder-slate-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

  return (
    <div className="min-h-screen mx-auto max-w-screen-2xl mt-2 p-4 py-4 md:p-6 2xl:p-10 bg-slate-100 dark:bg-slate-900">
      {/* <Breadcrumb /> */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="mx-auto max-w-screen-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="col-span-7">
                <div className="px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      {ticketId ? "Edit Air Ticket" : "Add Air Ticket"}
                    </h3>
                  </div>
                  <div className="py-6">
                    {[
                      { name: "where_from", label: "Where From" },
                      { name: "where_to", label: "Where To" },
                      { name: "travel_date", label: "Travel Date" },
                      { name: "return_date", label: "Return Date" },
                      { name: "ticket_category", label: "Ticket Category" },
                      { name: "passenger_number", label: "Passenger Number" },
                    ].map((field) => (
                      <div key={field.name} className="mt-3 flex flex-col gap-5.5 p-6.5">
                        <FormField
                          control={form.control}
                          name={field.name}
                          render={({ field: fieldProps }) => (
                            <FormItem>
                              <div className="grid grid-cols-1 md:grid-cols-12">
                                <div className="col-span-3 mt-2">
                                  <FormLabel>{field.label}</FormLabel>
                                </div>
                                <div className="col-span-8">
                                  <FormControl>
                                    <Input className={inputClass} placeholder={field.label} {...fieldProps} />
                                  </FormControl>
                                </div>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    ))}
                    <div className="grid mt-4 justify-items-end">
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
                </div>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
