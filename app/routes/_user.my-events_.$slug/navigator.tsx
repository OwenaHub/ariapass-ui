import { useSearchParams } from 'react-router'

export default function Navigator({ event }: { event: OrganiserEvent }) {
    const [params, setParams] = useSearchParams();

    const menuItems = [
        'overview',
        'tickets',
        'event-program',
        'members',
    ] as const;

    return (
        <div className='relative w-full border-b mb-4'>
            <div className='flex items-center gap-3.5 w-full overflow-x-auto pr-8'>
                {menuItems.map((item) => (
                    <div
                        onClick={() => {
                            setParams((prev) => {
                                prev.set('tab', item);
                                return prev;
                            }, { replace: true });
                        }}
                        key={item}
                        className={`transition-all flex items-center gap-1 text-sm cursor-pointer whitespace-nowrap font-semibold capitalize py-1.5 px-3 border-b-3
                            ${params.get('tab') === item ? 'border-theme text-theme' : 'border-transparent'}
                        `}
                    >
                        <span>
                            {item.replace('-', ' ')}
                        </span>
                        {item === 'tickets' && (
                            <span className={`px-1 text-[10px] text-white rounded ${params.get('tab') === item ? 'bg-theme' : 'bg-primary'} `}>
                                {event.tickets.length}
                            </span>
                        )}
                    </div>
                ))}
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-linear-to-l from-white to-transparent pointer-events-none" />
        </div>
    )
}