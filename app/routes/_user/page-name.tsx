import { useLocation } from 'react-router';

export default function PageName() {
    const location = useLocation();
    return (
        <section className='capitalize font-bold'>
            {location.pathname.split('/')[1]}
        </section>
    );
}