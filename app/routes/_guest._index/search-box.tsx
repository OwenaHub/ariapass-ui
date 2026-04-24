import { RiCalendar2Line, RiMapPin2Line, RiSearchLine } from '@remixicon/react'

export default function SearchBox() {
    return (
        <div className="bg-white rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-2 md:p-0 flex flex-col md:flex-row border border-gray-100">
            <div className="flex-1 gap-3 flex items-starts px-4 py-3 md:py-4 border-b md:border-b-0 md:border-r border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer rounded-l-lg">
                <RiSearchLine />
                <div className="flex flex-col">
                    <span className="text-xs font-bold text-gray-900 uppercase">Search for</span>
                    <input type="text" placeholder="Artists, venues, or genres" className="border-none outline-none bg-transparent text-gray-900 placeholder-gray-500 text-sm mt-0.5 w-full" />
                </div>
            </div>

            <div className="flex-1 gap-3 flex items-starts px-4 py-3 md:py-4 border-b md:border-b-0 md:border-r border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
                <RiMapPin2Line />
                <div className="flex flex-col w-full">
                    <span className="text-xs font-bold text-gray-900 uppercase">Where</span>
                    <input type="text" defaultValue="Lagos, Nigeria" className="border-none outline-none bg-transparent text-gray-900 placeholder-gray-500 text-sm mt-0.5 w-full" />
                </div>
            </div>

            <div className="flex-1 gap-3 flex items-starts px-4 py-3 md:py-4 hover:bg-gray-50 transition-colors cursor-pointer md:rounded-r-lg">
                <RiCalendar2Line />
                <div className="flex flex-col w-full">
                    <span className="text-xs font-bold text-gray-900 uppercase">When</span>
                    <select className="border-none outline-none bg-transparent text-gray-900 text-sm mt-0.5 w-full cursor-pointer appearance-none">
                        <option>Any date</option>
                        <option>Today</option>
                        <option>Tomorrow</option>
                        <option>This weekend</option>
                    </select>
                </div>
            </div>

            <button className="bg-theme text-white px-8 py-4 md:rounded-r-lg font-bold transition-colors flex items-center justify-center m-2 md:m-0 rounded-md">
                <RiSearchLine />
                <span>Search</span>
            </button>
        </div>
    )
}
