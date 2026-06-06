import { Link } from 'react-router';
import { Text } from '~/components/ui/text';
import type { genreCategories } from './categories';
import { RiBookmark2Fill } from '@remixicon/react';

export default function GenreCard({ category }: { category: (typeof genreCategories)[number] }) {
    return (
        <div>
            <div className={`relative rounded overflow-hidden ${category.theme} aspect-square`}>
                <Link to={`/events/?category=${category.tag}`}>
                    <span aria-hidden="true" className="z-10 absolute inset-0" />
                </Link>

                {/* <div className='absolute top-0 left-0 w-full min-h-full bg-linear-to-t bg-gray-900/20 pointer-events-none' /> */}

                <div className="absolute flex items-start justify-between top-2 right-0 py-0.5 px-2.5 z-20">
                    <RiBookmark2Fill className="text-white text-2xl" />
                </div>

                {/* Perfectly centered using absolute positioning and translation */}
                <Text.p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-white text-2xl! text-center w-full font-bold px-2 pointer-events-none">
                    <span className="">
                        {category.title.split(" ")[0]}
                        {" "} <br />
                        {category.title.split(" ")[1]}
                    </span>
                </Text.p>
            </div>
            <div className='p-2'>
                <Text.p className="text-primary font-bold mb-1">
                    {category.title}
                </Text.p>
                <Text.small className="text-gray-500">
                    {category.description}
                </Text.small>
            </div>
        </div>
    )
}