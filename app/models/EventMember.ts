interface EventMember extends Model {
    email: string;
    name: string;
    userId: string | null;
    eventId: string | null;
    inviteToken: string;
    role: 'performer' | 'staff';
    status: 'invited' | 'accepted' | 'declined' | 'checked_in' | 'no_show';
}