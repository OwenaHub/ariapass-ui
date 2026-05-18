import { RiRefreshLine } from '@remixicon/react';

export default function RevalidateButton() {
    const handleRefresh = async () => {
        window.location.reload();
    };

    return <RiRefreshLine
        size={18}
        onClick={handleRefresh}
        className='cursor-pointer text-primary'
    />
}
