import { Link } from 'react-router';
import { Text } from '~/components/ui/text';
import type { genreCategories } from './categories';
import { RiHeartLine } from '@remixicon/react';

export default function GenreCard({ category }: { category: (typeof genreCategories)[number] }) {
    return (
        <div className="">
            <div className="relative bg-gray-100 group-hover:opacity-85 overflow-hidden rounded transition w-full aspect-square">
                <Link to={`#`}>
                    <span aria-hidden="true" className="z-10 absolute inset-0" />
                </Link>

                <img
                    src={category.bannerUrl}
                    alt={category.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                />

                <div className='absolute top-0 left-0 w-full min-h-full bg-linear-to-t from-black/60 to-black/20' />

                <div className="absolute flex items-start justify-between top-2 right-0 py-0.5 px-2.5">
                    <RiHeartLine className="text-white text-2xl" />
                </div>
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