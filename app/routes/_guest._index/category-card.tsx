import { Link } from 'react-router';
import { Text } from '~/components/ui/text';
import type { dateCategories } from './categories';
import { RiHeartLine } from '@remixicon/react';
import dayjs from 'dayjs';

export default function CategoryCard({ category }: { category: (typeof dateCategories)[number] }) {
  return (
    <div className="relative bg-gray-100 group-hover:opacity-85 overflow-hidden rounded transition h-80 w-60!">
      <Link to={`#`}>
        <span aria-hidden="true" className="z-10 absolute inset-0" />
      </Link>

      <img
        src={category.bannerUrl}
        alt={category.title}
        className="h-full w-full object-cover"
        loading="lazy"
      />

      <div className='absolute bottom-0 left-0 w-full min-h-40 bg-linear-to-t from-black to-transparent' />

      <div className="absolute flex items-start justify-between top-2 right-0 py-0.5 px-2.5">
        <RiHeartLine className="text-white text-2xl" />
      </div>

      <div className='absolute bottom-0 left-0 w-full text-white p-4'>
        <Text.h4 className="text-white leading-5 mb-1">
          {category.title}
        </Text.h4>
        <Text.p>
          {dayjs(category.startDate).format('MMM D')} - {dayjs(category.endDate).format('MMM D')}
        </Text.p>
      </div>
    </div>
  )
}