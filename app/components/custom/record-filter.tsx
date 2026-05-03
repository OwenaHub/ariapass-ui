import { RiArchiveStackLine, RiCheckLine, RiCloseLine, RiPencilLine, RiProhibitedLine } from "@remixicon/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export default function RecordFilter({ data }: { data?: any[] }) {

    const DEFAULT_FILTER = [
        {
            label: "Published",
            icon: <RiCheckLine size={16} />,
        },
        {
            label: "Draft",
            icon: <RiPencilLine size={16} />,
        },
        {
            label: "Suspended",
            icon: <RiProhibitedLine size={16} />,
        },
        {
            label: "Cancelled",
            icon: <RiCloseLine size={16} />,
        },
    ];

    const [searchParams, setSearchParams] = useSearchParams();
    const [filters, setFilters] = useState(DEFAULT_FILTER);

    useEffect(() => {
        if (data)
            setFilters(data);
    }, [data])

    return (
        <div className="flex items-center gap-2 overflow-x-auto">
            <button
                onClick={() => {
                    setSearchParams((prev) => {
                        prev.delete('status');
                        return prev;
                    });
                }}
                className={`
                        ${!searchParams.get('status') && 'bg-primary text-white'}
                        rounded-full text-nowrap ps-1.5 pe-2.5 py-1 bg-gray-200 flex items-center gap-1 text-xs hover:bg-gray-300 transition cursor-pointer`
                }
            >
                <RiArchiveStackLine size={16} /> <span className="font-medium">All</span>
            </button>

            {filters.map((filter) => (
                <button
                    onClick={() => setSearchParams({ status: filter.label.toLowerCase() })}
                    key={filter.label}
                    className={`
                        ${searchParams.get('status') === filter.label.toLocaleLowerCase() && 'bg-gray-700 text-white curs'}
                        rounded-full text-nowrap ps-1.5 pe-2.5 py-1 bg-gray-200 flex items-center gap-1 text-xs hover:bg-gray-300 transition cursor-pointer`
                    }
                >
                    {filter.icon} <span className="font-medium">{filter.label}</span>
                </button>
            ))}
        </div>
    )
}