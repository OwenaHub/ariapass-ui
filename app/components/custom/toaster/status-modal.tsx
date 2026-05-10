import { useSearchParams } from 'react-router';
import { useMemo } from 'react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '~/components/ui/dialog';
import { Button } from '~/components/ui/button';

// Import our logic from the dictionary file
import {
    FALLBACK_CONTENT,
    MESSAGE_DICTIONARY,
    MESSAGE_TYPES,
    THEME_MAP,
    type MsgCode
} from './dictionary';

export default function StatusModal() {
    const [params, setParams] = useSearchParams();

    // Scan the URL for valid message types
    const activeMessage = useMemo(() => {
        for (const type of MESSAGE_TYPES) {
            const code = params.get(type) as MsgCode | null;

            if (code) {
                // 💡 FIX: Add the explicit type annotation right here
                const content: { title: string; description: string } =
                    MESSAGE_DICTIONARY[code] || FALLBACK_CONTENT[type];

                const theme = THEME_MAP[type];
                return { type, code, content, theme };
            }
        }
        return null;
    }, [params]);

    const closeModal = () => {
        if (!activeMessage) return;

        setParams((prev) => {
            prev.delete(activeMessage.type);
            return prev;
        }, { replace: true });
    };

    // Render nothing if no message is in the URL
    if (!activeMessage) return null;

    const { content, theme } = activeMessage;
    const Icon = theme.icon;

    return (
        <Dialog open={true} onOpenChange={closeModal}>
            <DialogContent className={`bg-white border-s ${theme.border} py-4 max-w-sm md:max-w-md`}>
                <DialogHeader className='mb-2'>
                    <div className="flex items-start gap-4">

                        {/* Themed Icon Wrapper */}
                        <div className={`shrink-0 p-3 rounded-full ${theme.iconBg} ${theme.iconColor}`}>
                            <Icon className="w-6 h-6 md:w-7 md:h-7" />
                        </div>

                        {/* Text Content */}
                        <div className="pt-0.5 text-left">
                            <DialogTitle className='text-primary text-base mb-1.5'>
                                {content.title}
                            </DialogTitle>

                            <DialogDescription>
                                <span className='text-sm font-light'>
                                    {content.description}
                                </span>
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <DialogFooter className="w-full">
                    <Button
                        onClick={closeModal}
                        size={"sm"}
                        className="cursor-pointer px-10 transition-all duration-200 text-white w-full sm:w-auto"
                    >
                        Got it
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}