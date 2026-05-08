import { useSearchParams } from 'react-router'

export default function Navigator() {
    const [params, setParams] = useSearchParams();

    const menuItems = [
        'overview',
        'tickets',
        'event-program',
        'members',
    ];

    return (
        <div className='w-full mb-4 pb-2 flex items-center gap-4 max-w-full overflow-x-auto'>
            {menuItems.map((item) => (
                <div
                    onClick={() => setParams({ tab: item })}
                    className={`text-sm cursor-pointer text-nowrap font-semibold capitalize p-1.5 border-b-2
                        ${params.get('tab') === item ? 'border-theme text-theme bg-indigo-50' : 'border-white'}
                    `}
                >
                    {item}
                </div>
            ))}
        </div>
    )
}
