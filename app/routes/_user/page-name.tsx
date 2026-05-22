import { RiArrowDownSFill } from '@remixicon/react';
import { Link, useLocation } from 'react-router';
import CustomAvatar from '~/components/custom/custom-avatar';

export default function PageName({ user }: { user?: User }) {
    const location = useLocation();
    return (
        <section className='w-full capitalize font-bold flex items-center justify-between'>
            <div>
                {location.pathname.split('/')[1]}
            </div>
            <Link to="/account" className='flex items-center gap-1'>
                <RiArrowDownSFill />
                <CustomAvatar name={user?.name || 'John Doe'} styles="size-10" />
            </Link>
        </section>
    );
}