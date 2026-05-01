import { Input } from '~/components/ui/input'

export default function CompanyName({ profile }: { profile: OrganiseProfile | null }) {
    return (
        <div>
            <h1 className="text-xl font-medium mb-3">
                <span className="text-primary-theme"> 1.</span> Company name
            </h1>
            <div className='text-sm mb-5 font-light'>
                This name will be used to check your virality and will appear when you post events and on your digital tickets
            </div>
            <div>
                <Input
                    placeholder='ACME Choral'
                    name='organiser_name'
                    maxLength={40}
                    defaultValue={profile?.organiserName || ''}
                    required

                    onInput={(e) => {
                        const input = e.target as HTMLInputElement;
                        const remaining = 40 - input.value.length;
                        const counter = document.getElementById("company-name-counter");
                        if (counter) counter.textContent = `${remaining} characters left`;
                    }}
                />
                <div id="company-name-counter" className="ms-2 text-xs text-gray-500 mt-1">
                    40 characters left
                </div>
            </div>
        </div>
    )
}
