import { useState } from "react";
import { RiExpandVerticalLine, RiFileDownloadLine } from "@remixicon/react";
import CustomAvatar from "~/components/custom/custom-avatar";
import TransactionStatus from "~/components/custom/transaction-status";
import { Button } from "~/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "~/components/ui/dialog";
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

    // State to manage the Export Confirmation Modal
    const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);

    // 1. Check if it's a free event
    const isFreeEvent = event.eventPlan?.tier === 'BASIC';

    // 2. The CSV Export Logic
    const handleExportCSV = () => {
        if (!PURCHASES.length) return;

        // Define the column headers
        const headers = ["Name", "Email", "Ticket Type", "Price", "Status", "Ticket Code", "Reference"];

        // Map the purchases into CSV rows
        const csvRows = PURCHASES.map(p => [
            `"${p.user?.name || ''}"`,
            `"${p.user?.email || ''}"`,
            `"${p.ticket?.name || ''}"`,
            p.amount,
            `"${p.status || ''}"`,
            `"${p.code || ''}"`,
            `"${p.reference ? p.reference.split('-')[0] : ''}"`
        ]);

        // Combine headers and rows with newline characters
        const csvContent = [
            headers.join(","),
            ...csvRows.map(row => row.join(","))
        ].join("\n");

        // Create a Blob containing the CSV data
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        // Create a hidden link and trigger the download
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${event.slug || 'event'}-purchases.csv`);
        document.body.appendChild(link);
        link.click();

        // Cleanup
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        // Close the modal after download starts
        setIsExportDialogOpen(false);
    };

    return (
        <div>
            {/* Header section with the Export Confirmation Dialog */}
            <div className="flex items-center justify-between mb-4">
                <p className="text-gray-700 font-semibold">Sales & Attendees</p>

                <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
                    <DialogTrigger asChild>
                        <Button
                            variant="outline"
                            size="sm"
                            className="gap-2"
                            disabled={isFreeEvent || PURCHASES.length === 0}
                        >
                            <RiFileDownloadLine size={16} />
                            {isFreeEvent ? "Export Unavailable (Free)" : "Export CSV"}
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle className="text-xl">Export Attendee Data</DialogTitle>
                            <DialogDescription>
                                You are about to download a CSV file containing sensitive attendee information, including names, emails, and ticket codes.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="bg-amber-50 text-amber-800 p-3 rounded text-xs border border-amber-200 my-2">
                            <strong>Note:</strong> Please ensure you handle this data securely and in compliance with your local privacy regulations.
                        </div>

                        <DialogFooter className="mt-4 flex sm:justify-end gap-2">
                            <Button variant="ghost" onClick={() => setIsExportDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleExportCSV}>
                                Continue & Download
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

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
                            <TableCell colSpan={3} className="text-center text-gray-400 py-6">
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