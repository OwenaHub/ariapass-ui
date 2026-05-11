import { Text } from '~/components/ui/text';
import { Textarea } from '~/components/ui/textarea'

export default function CompanyBio({ profile }: { profile: OrganiseProfile }) {
    return (
        <div>
            <Text.h2 className="mb-3">
                <span className="text-primary-theme"> 2.</span> Company Biography
            </Text.h2>
            <Text.p className='mb-4'>
                Keep it simple; great profiles give real metrics and share their vision with their fans
            </Text.p>
            <div>
                <Textarea
                    rows={5}
                    cols={20}
                    className='rounded-lg shadow-none text-sm'
                    placeholder='Amazing biography on ACME chorale...'
                    name='biography'
                    defaultValue={profile?.bio || ''}
                    maxLength={300}
                    minLength={10}
                    required

                    onInput={(e) => {
                        const input = e.target as HTMLInputElement;
                        const remaining = 300 - input.value.length;
                        const counter = document.getElementById("bio-text-counter");
                        if (counter) counter.textContent = `${remaining} characters left`;
                    }}
                />
                <div id="bio-text-counter" className="text-sm text-gray-500 mt-1">
                    300 characters left
                </div>
            </div>
        </div>
    )
}
