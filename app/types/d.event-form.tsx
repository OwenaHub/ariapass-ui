export interface FormProps {
    title: string,
    description: string,
    banner_url: File | null,
    event_type: string
    status: 'draft' | 'suspended' | 'cancelled' | 'completed' | 'published',
    engagement_visible: boolean,
    extra_info: string,
    venue_name: string,
    venue_address: string,
    city: string,
    country: string,
    start_time: Date | undefined,
}
