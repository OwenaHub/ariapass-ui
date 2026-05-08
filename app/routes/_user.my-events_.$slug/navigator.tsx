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
        <div className='w-full border-b mb-4 flex items-center gap-3.5 max-w-full overflow-x-auto'>
            {menuItems.map((item) => (
                <div
                    onClick={() => setParams({ tab: item })} key={item}
                    className={`text-sm cursor-pointer text-nowrap font-semibold capitalize py-1.5 px-3 border-b-3
                        ${params.get('tab') === item ? 'border-theme text-theme bg-indigo-50' : 'border-white'}
                    `}
                >
                    {item}
                </div>
            ))}
        </div>
    )
}
