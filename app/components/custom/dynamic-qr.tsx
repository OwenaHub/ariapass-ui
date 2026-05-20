import { RiQrCodeLine } from "@remixicon/react"
import { QRCode } from "react-qr-code"
import { Button } from "~/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog"

export function DynamicQR({ qrValue }: { qrValue: string }) {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="outline" className="w-full" size={"lg"}>
                        <RiQrCodeLine />
                        <span className='font-bold'>QR Code</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm rounded">
                    <DialogHeader className='pb-2'>
                        <DialogTitle>Scan QR</DialogTitle>
                        <DialogDescription>
                            This leads to: <span className="font-bold">
                                {qrValue}
                            </span>
                        </DialogDescription>
                    </DialogHeader>

                    <div className="pb-5" style={{ height: "auto", margin: "0 auto", maxWidth: 250, width: "100%" }}>
                        <QRCode
                            size={256}
                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                            value={qrValue}
                            viewBox={`0 0 256 256`}
                        />
                    </div>
                </DialogContent>
            </form>
        </Dialog >
    )
}
