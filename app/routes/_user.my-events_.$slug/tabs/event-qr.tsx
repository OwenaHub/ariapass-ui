import { DynamicQR } from '~/components/custom/dynamic-qr'
import { Text } from '~/components/ui/text'

export default function EventQR({ event }: { event: OrganiserEvent }) {
    return (
        <div className='p-5 bg-gray-100 rounded'>
            <Text.p>
                Automatically generated QR code to your event
            </Text.p>
            <div className="md:max-w-md w-full mt-5">
                <DynamicQR qrValue={`https://ariapass.africa/events/${event.slug}`} />
            </div>
        </div>
    )
}
