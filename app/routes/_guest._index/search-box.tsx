import { RiCalendar2Line, RiMusic2Line, RiSearchLine } from '@remixicon/react'
import { useSearchParams } from 'react-router'
import { eventCategory } from '~/lib/static.data';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select"

export default function SearchBox() {
    const [searchParams, setSearchParams] = useSearchParams();

    const updateParam = (key: string, value: string) => {
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);

            // If the value is 'any_genre', remove the category param to keep the URL clean
            if (value === 'any_genre') {
                newParams.delete(key);
            } else {
                newParams.set(key, value);
            }

            return newParams;
        }, { preventScrollReset: true });
    };

    return (
        <div className="bg-white rounded shadow-lg p-2 md:p-0 flex flex-col md:flex-row border border-gray-100 w-full">
            <Select
                value={searchParams.get('category') || 'any_genre'}
                onValueChange={(val) => updateParam('category', val)}
            >
                <SelectTrigger className="flex-1 w-full gap-3 flex items-start px-4 py-3 md:py-4 h-auto border-0 border-b md:border-b-0 md:border-r border-gray-200 hover:bg-gray-50 transition-colors roundeds bg-transparent shadow-none focus:ring-0 focus:ring-offset-0 cursor-pointer">
                    <div className="shrink-0 mt-0.5">
                        <RiMusic2Line className="text-gray-600 size-6"/>
                    </div>
                    <div className="flex flex-col w-full text-left">
                        <span className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">Genre</span>
                        <span className="text-gray-900 text-sm mt-0.5 w-full font-medium capitalize truncate">
                            <SelectValue />
                        </span>
                    </div>
                </SelectTrigger>
                <SelectContent className='mt-10 mx-auto w-full'>
                    <SelectItem value="any_genre">All Genres</SelectItem>
                    {eventCategory.map(cat => (
                        <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select
                value={searchParams.get('filter') || 'upcoming'}
                onValueChange={(val) => updateParam('filter', val)}
            >
                <SelectTrigger className="flex-1 w-full gap-3 flex items-start px-4 py-3 md:py-4 h-auto border-0 border-b md:border-b-0 md:border-r border-gray-200 hover:bg-gray-50 transition-colors rounded-none bg-transparent shadow-none focus:ring-0 focus:ring-offset-0 cursor-pointer">
                    <div className="shrink-0 mt-0.5">
                        <RiCalendar2Line className="text-gray-600 size-6"/>
                    </div>
                    <div className="flex flex-col w-full text-left">
                        <span className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">When</span>
                        <span className="text-gray-900 text-sm mt-0.5 w-full font-medium capitalize truncate">
                            <SelectValue />
                        </span>
                    </div>
                </SelectTrigger>
                <SelectContent className='mt-10 mx-auto w-full'>
                    <SelectItem value="upcoming">Upcoming Events</SelectItem>
                    <SelectItem value="all">All Events</SelectItem>
                </SelectContent>
            </Select>

            <label className="flex-1 gap-3 flex items-start px-2 py-3 md:py-4 hover:bg-gray-50 transition-colors cursor-text rounded-none focus-within:bg-gray-50">
                <div className="shrink-0 mt-0.5">
                    <RiSearchLine className="text-gray-600 size-6" />
                </div>
                <div className="flex flex-col w-full">
                    <span className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">Search</span>
                    <input
                        type="text"
                        placeholder="Artists, venues..."
                        defaultValue={searchParams.get('q') || ''}
                        onBlur={(e) => updateParam('q', e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') updateParam('q', e.currentTarget.value);
                        }}
                        className="border-none outline-none bg-transparent text-gray-900 placeholder-gray-400 text-sm mt-0.5 w-full font-medium"
                    />
                </div>
            </label>

            <button className="bg-theme text-white px-8 py-4 rounded font-bold transition-all hover:brightness-110 active:scale-95 flex items-center justify-center m-2 md:m-0 shrink-0 cursor-pointer">
                <span>Search</span>
            </button>
        </div>
    )
}