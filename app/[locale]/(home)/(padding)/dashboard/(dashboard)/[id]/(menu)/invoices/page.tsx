import FunctionalButton from "@/app/components/FunctionalButton";
import Payment from "@/app/components/Payment";
import MiniTitle from "@/app/components/defaults/MiniTitle";
import ModalCustom from "@/app/components/defaults/ModalCustom";
import { Server } from "@/app/main/Server";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CheckCircle, XCircle } from "lucide-react";
import React from "react";

const page = async ({ params: { id } }: { params: { id: string } }) => {
  const data = await Server({ resourceName: "my-subs" });
  const invoices = await Server({ resourceName: "my-invoices" });
  console.log(invoices);
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className=" text-main2 ">INVOICE NAME</TableHead>
            <TableHead className=" text-main2 ">DATE</TableHead>
            <TableHead className=" text-main2 ">STATUS</TableHead>
            <TableHead className=" text-main2 ">INVOICE VALUE</TableHead>
            <TableHead className=" text-main2 "> ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.data.map((job, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium flex flex-col gap-2">
                <MiniTitle boldness="bold" size="lg" color=" text-black" text={job.title} />
              </TableCell>
              <TableCell className="mr-auto md:ml-0 font-medium ">
                <p className=" text-muted-foreground">{format(job.created_at, "dd/MM/yyyy")}</p>
              </TableCell>
              <TableCell className="  gap-2  font-medium ">
                <div className="flex items-center gap-2">
                  {job.status.key === "paid" ? (
                    <CheckCircle className=" mr-2 text-green-500  md:w-4 w-2 h-2 md:h-4" />
                  ) : (
                    <XCircle className=" mr-2 text-red-500  md:w-4 w-2 h-2 md:h-4" />
                  )}
                  <p>{job.status.value}</p>
                </div>
              </TableCell>
              <TableCell className="  gap-2 ">
                <p className=" text-main2 font-semibold">{job.total}</p>
              </TableCell>
              {job.status.key === "hold" && (
                <TableCell>
                  <ModalCustom
                    btn={
                      <Button size={"lg"} className={cn("w-full text-base hover:text-gray-50 bg-gray-100 text-main2 ")}>
                        PAY INVOICE
                      </Button>
                    }
                    content={<Payment planId={job.id} invoice={true} />}
                  />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className=" flex flex-col gap-4 mt-10">
        <div className=" justify-between flex flex-wrap sm:flex-nowrap w-full">
          <MiniTitle boldness="bold" size="lg" color=" text-main2" text="SUBSCRIPTIONS" />
          <FunctionalButton link={`/dashboard/${id}/invoices/subscriptions`} btnText="Add Subscription" />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className=" text-main2 ">Subscription type</TableHead>
              <TableHead className=" text-main2 ">Subscription Date</TableHead>
              <TableHead className=" text-main2 ">Subscription value</TableHead>
              <TableHead className=" text-main2 ">Total number of meetings </TableHead>
              <TableHead className=" text-main2 ">Number of meetings available</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.data.map((job, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">
                  <MiniTitle boldness="bold" size="lg" color="text-black" text={job.plan_json.title} />
                </TableCell>
                <TableCell className="font-medium">
                  <p className="text-muted-foreground">{format(job.plan_json.created_at, "dd/MM/yyyy")}</p>
                </TableCell>
                <TableCell className=" items-center">
                  <p className="text-main2 font-semibold">{job.plan_json.price}</p>
                </TableCell>
                <TableCell className=" items-center">
                  <p className="text-main2 font-semibold">{job.plan_json.usage_limit}</p>
                </TableCell>
                <TableCell className=" items-center">
                  <p className="text-main2 font-semibold">{job.plan_json.usage_limit - job.plan_json.used}</p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default page;
