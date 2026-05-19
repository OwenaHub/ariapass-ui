import { useNavigate } from 'react-router';
import { Button } from '../ui/button';
import { RiArrowLeftLine } from '@remixicon/react';

export default function BackButton() {
    const navigate = useNavigate();

    return (
        <Button
            onClick={
                () => navigate(-1)
            }
            type="button"
            className="mb-10"
            variant={'secondary'}
            size={"xs"}
        >
            <RiArrowLeftLine />
            <span>Back</span>
        </Button>
    )
}
