import {
    RiFileDownloadLine,
    RiFileTextLine,
    RiFileWordLine,
    RiFilePdfLine
} from "@remixicon/react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useState } from "react";
import FeatureLockedPrompt from "~/components/FeatureLockedPrompt";
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
import { eventTicketPurchases } from "~/lib/utils";

type ExportFormat = "csv" | "doc" | "pdf" | null;

export default function ExportListButton({ event }: { event: OrganiserEvent }) {
    const PURCHASES = eventTicketPurchases(event.tickets);
    const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
    const [exportFormat, setExportFormat] = useState<ExportFormat>(null);

    const isFreeEvent = event.eventPlan?.tier === 'BASIC';

    // Helper to abstract the Blob download trigger (for CSV and DOC)
    const triggerDownload = (blob: Blob, filename: string) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleExport = () => {
        if (!PURCHASES.length || !exportFormat) return;

        const headers = ["Name", "Email", "Ticket Type", "Price", "Status", "Ticket Code", "Reference"];
        const fileName = `${event.slug || 'event'}-purchases`;

        if (exportFormat === "csv") {
            const csvRows = PURCHASES.map(p => [
                `"${p.user?.name || ''}"`,
                `"${p.user?.email || ''}"`,
                `"${p.ticket?.name || ''}"`,
                p.amount,
                `"${p.status || ''}"`,
                `"${p.code || ''}"`,
                `"${p.reference ? p.reference.split('-')[0] : ''}"`
            ]);

            const csvContent = [
                headers.join(","),
                ...csvRows.map(row => row.join(","))
            ].join("\n");

            const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
            triggerDownload(blob, `${fileName}.csv`);

        } else if (exportFormat === "doc") {
            // Generates a lightweight HTML string that MS Word natively parses as a Document
            const htmlContent = `
                <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
                <head><meta charset='utf-8'><title>Export</title></head><body>
                <h2>Sales & Attendees - ${event.title || 'Event'}</h2>
                <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse; width: 100%;">
                    <tr style="background-color: #f3f4f6; text-align: left;">
                        ${headers.map(h => `<th>${h}</th>`).join('')}
                    </tr>
                    ${PURCHASES.map(p => `
                        <tr>
                            <td>${p.user?.name || ''}</td>
                            <td>${p.user?.email || ''}</td>
                            <td>${p.ticket?.name || ''}</td>
                            <td>${p.amount}</td>
                            <td>${p.status || ''}</td>
                            <td>${p.code || ''}</td>
                            <td>${p.reference ? p.reference.split('-')[0] : ''}</td>
                        </tr>
                    `).join('')}
                </table>
                </body></html>
            `;
            const blob = new Blob(['\ufeff', htmlContent], { type: 'application/msword' });
            triggerDownload(blob, `${fileName}.doc`);

        } else if (exportFormat === "pdf") {
            // Create a clean array of rows without CSV quote wrapping
            const pdfRows = PURCHASES.map(p => [
                p.user?.name || '',
                p.user?.email || '',
                p.ticket?.name || '',
                p.amount?.toString() || '0',
                p.status?.toUpperCase() || '',
                p.code || '',
                p.reference ? p.reference.split('-')[0] : ''
            ]);

            // Initialize jsPDF document (Landscape mode 'l' often fits tables better)
            const doc = new jsPDF('l');

            // Add Document Titles
            doc.setFontSize(16);
            doc.text(`Sales & Attendees - ${event.title || 'Event'}`, 14, 15);
            doc.setFontSize(10);
            doc.setTextColor(100);
            doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 22);

            // Generate the Table
            autoTable(doc, {
                startY: 28,
                head: [headers],
                body: pdfRows,
                theme: 'striped',
                headStyles: {
                    fillColor: [79, 70, 229], // Tailwind Indigo-600 to match theme
                    textColor: [255, 255, 255],
                    fontStyle: 'bold'
                },
                styles: {
                    fontSize: 9,
                    cellPadding: 4
                },
                alternateRowStyles: {
                    fillColor: [249, 250, 251] // Tailwind Gray-50
                }
            });

            // Trigger PDF native save
            doc.save(`${fileName}.pdf`);
        }

        // Cleanup & Close
        setIsExportDialogOpen(false);
        setExportFormat(null);
    };

    return (
        <Dialog
            open={isExportDialogOpen}
            onOpenChange={(open) => {
                setIsExportDialogOpen(open);
                if (!open) setExportFormat(null); // Reset selection when closed
            }}
        >
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="gap-1"
                    disabled={PURCHASES.length === 0}
                >
                    <RiFileDownloadLine size={16} />
                    <span>
                        Export List
                    </span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-xl">Export Attendee Data</DialogTitle>
                    <DialogDescription>
                        Select your preferred file format for the attendee data export.
                    </DialogDescription>
                </DialogHeader>

                {isFreeEvent ? (
                    <FeatureLockedPrompt eventSlug={event.slug} featureName="Export Data" />
                ) : (
                    <>
                        <div className="grid grid-cols-3 gap-3 my-4">
                            <button
                                type="button"
                                onClick={() => setExportFormat("csv")}
                                className={`flex flex-col items-center justify-center p-4 rounded border transition-all ${exportFormat === "csv"
                                    ? 'border-primary bg-primary/5 text-primary'
                                    : 'border-gray-200 text-gray-500 hover:border-gray-300'
                                    }`}
                            >
                                <RiFileTextLine size={28} />
                                <span className="uppercase text-xs font-bold mt-2">CSV</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setExportFormat("doc")}
                                className={`flex flex-col items-center justify-center p-4 rounded border transition-all ${exportFormat === "doc"
                                    ? 'border-blue-600 bg-blue-50 text-blue-600'
                                    : 'border-gray-200 text-gray-500 hover:border-gray-300'
                                    }`}
                            >
                                <RiFileWordLine size={28} />
                                <span className="uppercase text-xs font-bold mt-2">DOC</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setExportFormat("pdf")}
                                className={`flex flex-col items-center justify-center p-4 rounded border transition-all ${exportFormat === "pdf"
                                    ? 'border-red-600 bg-red-50 text-red-600'
                                    : 'border-gray-200 text-gray-500 hover:border-gray-300'
                                    }`}
                            >
                                <RiFilePdfLine size={28} />
                                <span className="uppercase text-xs font-bold mt-2">PDF</span>
                            </button>
                        </div>

                        <div className="bg-amber-50 text-amber-800 p-3 rounded text-xs border border-amber-200 mb-2">
                            <strong>Note:</strong> Please ensure you handle this data securely and in compliance with your local privacy regulations.
                        </div>

                        <DialogFooter className="mt-4 flex sm:justify-end gap-2">
                            <Button variant="ghost" onClick={() => setIsExportDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button
                                onClick={handleExport}
                                disabled={!exportFormat}
                            >
                                Continue & Download
                            </Button>
                        </DialogFooter>
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}
