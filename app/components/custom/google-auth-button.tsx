import { API_URL } from '~/config/defaults';
import { Button } from '../ui/button';


export default function GoogleAuthButton({ text }: { text: string }) {
    const handleGoogleSignIn = () => {
        window.location.href = `${API_URL}/api/auth/google/redirect`;
    };

    return (
        <Button
        size={'lg'}
            variant={"secondary"}
            onClick={handleGoogleSignIn}
            className="flex w-full gap-2 items-center cursor-pointer">
            <img src="/images/logos/google.png" alt="..." width="16" />
            <span className="text-black font-medium">{text} with Google</span>
        </Button>
    )
};