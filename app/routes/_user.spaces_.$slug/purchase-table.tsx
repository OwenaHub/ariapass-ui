import { RiExpandVerticalLine } from "@remixicon/react";
import CustomAvatar from "~/components/custom/custom-avatar";
import TransactionStatus from "~/components/custom/transaction-status";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/ui/table";
import FormatPrice from "~/components/utility/format-price";
import { eventTicketPurchases } from "~/lib/utils";

export default function PurchasesTable({ event }: { event: OrganiserEvent }) {
    const PURCHASES = eventTicketPurchases(event.tickets);

    return (
        <div>
            <Table>
                <TableCaption className="uppercase font-medium text-xs">Ticket Purchases</TableCaption>
                <TableHeader>
                    <TableRow className="border-0">
                        <TableHead className="text-xs uppercase font-semibold">
                            {/* Name */}
                        </TableHead>
                        <TableHead className="text-xs w-10 uppercase font-semibold">
                            {/* Seat */}
                        </TableHead>
                        <TableHead>
                            {/* Actions */}
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {PURCHASES.length ? (
                        PURCHASES.map((purchase) => (
                            <TableRow key={purchase.id} className="text-xs">
                                <TableCell>
                                    <div className="flex gap-1 items-center">
                                        <CustomAvatar name={purchase.user.name} styles="h-9 w-9" />
                                        <span className="font-medium tracking-tight">
                                            {purchase.user.name}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col items-start">
                                        <span
                                            className="uppercase font-bold tracking-tighter"
                                            style={{ color: purchase.ticket.theme }}
                                        >
                                            {purchase.ticket.name}
                                        </span>
                                        <span className="text-xs font-light flex items-center gap-1">
                                            <FormatPrice price={purchase.amount} />
                                            <TransactionStatus status={purchase.status} />
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-center w-10">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button size={'icon-sm'} variant={'secondary'}>
                                                <RiExpandVerticalLine size={20} className=" inline-block" />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-106.25">
                                            <div className="flex flex-col gap-4">
                                                <div>
                                                    <div className="text-gray-400 text-xs">Ticket Code</div>
                                                    <div className="text-sm font-medium">
                                                        {purchase.code}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-gray-400 text-xs">Email</div>
                                                    <div className="text-sm font-medium">
                                                        {purchase.user.email}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-gray-400 text-xs">Reference</div>
                                                    <div className="text-sm font-medium">
                                                        {purchase.reference?.split('-')[0]}
                                                    </div>
                                                </div>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center text-gray-400 py-3">
                                No recorded sales yet
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow className="w-full">
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}
