import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Text } from '~/components/ui/text';

export default function CompanyContact({ profile }: { profile: OrganiseProfile }) {
    return (
        <div>
            <Text.h2 className="mb-3">
                <span className="text-primary-theme"> 3.</span> Contact Information
            </Text.h2>
            <Text.p className='mb-4'>
                Provide contact details for your profile, this will be used to contact you by your clients
            </Text.p>
            <div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-7 mb-7'>
                    <div>
                        <Label className='mb-1 text-sm font-light' htmlFor='website'>Website</Label>
                        <Input
                            placeholder='https://acme.org'
                            name='website_url'
                            defaultValue={profile?.websiteUrl || ''}
                            id='website'
                            type='url'
                        />
                    </div>
                    <div>
                        <Label className='mb-1 text-sm font-light' htmlFor='email'>Email</Label>
                        <Input
                            placeholder='acme@choral.com'
                            name='contact_email'
                            defaultValue={profile?.contactEmail || ''}
                            id='email'
                            type='email'
                        />
                    </div>
                </div>
                <div className=''>
                    <Label className='mb-1 text-sm font-light' htmlFor='phone'>Phone</Label>
                    <Input
                        id='phone'
                        placeholder='0800 000 0000'
                        name='contact_phone'
                        defaultValue={profile?.contactPhone || ''}
                        type='tel'
                        maxLength={11}
                        required

                        onInput={(e) => {
                            const input = e.target as HTMLInputElement;
                            const remaining = 11 - input.value.length;
                            const counter = document.getElementById("phone-counter");
                            if (counter) counter.textContent = `${remaining} characters left`;
                        }}
                    />
                    <div id="phone-counter" className="text-xs text-gray-500 mt-1">
                        11 characters left
                    </div>
                </div>
            </div>
        </div>
    )
}
