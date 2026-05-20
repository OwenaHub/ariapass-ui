import { useEffect, useState } from "react"
import { useFetcher } from "react-router"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Textarea } from "~/components/ui/textarea"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "~/components/ui/accordion"
import { getUpgradeTarget } from "~/lib/static.data"
import { RiAddLine, RiCloseLine, RiDeleteBinLine, RiPencilLine } from "@remixicon/react"
import { FormatLineBreak } from "~/components/custom/format-line-break"
import UpgradePlan from "~/components/cards/upgrade-plan"
import EmptyState from "~/components/custom/empty-state"

// ============================================================================
// 1. MAIN COMPONENT
// ============================================================================
export default function EventProgram({ event }: { event: OrganiserEvent }) {
    const fetcher = useFetcher();
    const eventProgramUpgrade = getUpgradeTarget(event, 'hasEventProgram');
    const [newProgram, setNewProgram] = useState<boolean>(false);

    // Only handle the "Create Program" state here
    useEffect(() => {
        setNewProgram(false);
    }, [fetcher.state]);

    const hasPrograms = event.eventProgram && event.eventProgram.length > 0;

    return (
        <div className="">
            {hasPrograms ? (
                event.eventProgram?.map((program) => (
                    <ProgramCard 
                        key={program.id} 
                        event={event} 
                        program={program} 
                        fetcher={fetcher} 
                    />
                ))
            ) : (
                <EmptyProgramState 
                    event={event} 
                    fetcher={fetcher}
                    upgradeTarget={eventProgramUpgrade}
                    newProgram={newProgram}
                    setNewProgram={setNewProgram}
                />
            )}
        </div>
    )
}

// ============================================================================
// 2. INDIVIDUAL PROGRAM CARD (Isolates state per program)
// ============================================================================
function ProgramCard({ event, program, fetcher }: { event: any, program: any, fetcher: any }) {
    const [editProgram, setEditedProgram] = useState<boolean>(false);
    const [newItem, setNewItem] = useState<boolean>(false);
    const [itemToEdit, setItemToEdit] = useState<{ id: string, title: string, description: string } | null>(null);

    // Reset local states when fetcher completes
    useEffect(() => {
        setEditedProgram(false);
        setNewItem(false);
        setItemToEdit(null);
    }, [fetcher.state]);

    return (
        <div className="bg-white rounded border-gray-100 mb-6">
            <p className="tracking-tight text-sm font-light text-gray-500 mb-2">Event Program</p>

            {editProgram ? (
                <ProgramEditForm program={program} event={event} fetcher={fetcher} onCancel={() => setEditedProgram(false)} />
            ) : (
                <>
                    {/* Program Header */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between mb-7">
                        <h3 className="font-semibold text-xl tracking-tighter">
                            {program.title}
                        </h3>
                        <div className="flex items-center gap-2">
                            <Button onClick={() => setEditedProgram(true)} className="rounded-full cursor-pointer" size={'sm'} variant={'secondary'}>
                                <RiPencilLine className="size-4 hover:text-primary-theme" strokeWidth={2} />
                            </Button>

                            <fetcher.Form action={`/my-events/${event.slug}/programs`} method={'POST'} onSubmit={(e: any) => {
                                if (!window.confirm("Are you sure you want to delete this entire program?")) e.preventDefault();
                            }}>
                                <input type="hidden" name="type" value="program.delete" />
                                <input type="hidden" name="program_id" value={program.id} />
                                <Button type="submit" className="rounded-full cursor-pointer" size={'sm'} variant={'secondary'}>
                                    <RiDeleteBinLine className="size-4 hover:text-destructive" strokeWidth={2} />
                                </Button>
                            </fetcher.Form>
                        </div>
                    </div>

                    {/* Program Items List */}
                    {(!newItem && !itemToEdit) && (
                        <ProgramItemsList program={program} event={event} fetcher={fetcher} onEditItem={setItemToEdit} />
                    )}

                    {/* Forms */}
                    {itemToEdit && (
                        <ItemEditForm program={program} event={event} fetcher={fetcher} itemToEdit={itemToEdit} onCancel={() => setItemToEdit(null)} />
                    )}

                    {newItem && (
                        <ItemCreateForm program={program} event={event} fetcher={fetcher} onCancel={() => setNewItem(false)} />
                    )}

                    {/* Add Button */}
                    {(!editProgram && !newItem && !itemToEdit) && (
                        <div className="mt-6 pt-4 border-t border-gray-100">
                            <Button variant={'outline'} className="w-full py-5 border-dashed border-2 hover:bg-gray-50 rounded-lg cursor-pointer" onClick={() => setNewItem(true)}>
                                <RiAddLine className="mr-2 size-4" /> Add new entry to program
                            </Button>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

// ============================================================================
// 3. SUB-COMPONENTS (Keeps the main render clean)
// ============================================================================

function ProgramItemsList({ program, event, fetcher, onEditItem }: { program: any, event: any, fetcher: any, onEditItem: (item: any) => void }) {
    return (
        <Accordion type="single" collapsible className="w-full bg-gray-50/50 px-4 py-2 rounded-lg border border-gray-100">
            {program.programItems.map((programItem: any, index: number) => (
                <AccordionItem key={programItem.id} value={`item-${index}`}>
                    <AccordionTrigger className="text-sm tracking-tighter hover:no-underline">
                        <div className="flex text-left">
                            <span className="font-bold text-primary-theme me-2">{index + 1}.</span>
                            <span className="font-semibold text-gray-800">{programItem.title}</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-gray-600 pt-2 pb-4">
                        {programItem.description ? (
                            <div className="prose prose-sm max-w-none">
                                <FormatLineBreak input={programItem.description} />
                            </div>
                        ) : (
                            <span className="text-gray-400 italic">No content</span>
                        )}

                        <div className="mt-4 flex items-center gap-2">
                            <Button variant="outline" size="sm" className="rounded-full shadow-none cursor-pointer" onClick={() => onEditItem({
                                id: programItem.id,
                                title: programItem.title,
                                description: programItem.description || ''
                            })}>
                                <RiPencilLine className="size-3 mr-1" strokeWidth={2} /> Edit
                            </Button>
                            <fetcher.Form action={`/my-events/${event.slug}/programs`} method={'POST'} onSubmit={(e: any) => {
                                if (!window.confirm("Delete this item?")) e.preventDefault();
                            }}>
                                <input type="hidden" name="type" value="program.item.delete" />
                                <input type="hidden" name="program_id" value={program.id} />
                                <input type="hidden" name="item_id" value={programItem.id} />
                                <Button type="submit" variant="outline" size="sm" className="rounded-full shadow-none cursor-pointer text-destructive hover:bg-destructive/10">
                                    <RiDeleteBinLine className="size-3" strokeWidth={2} />
                                </Button>
                            </fetcher.Form>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
}

function ProgramEditForm({ program, event, fetcher, onCancel }: { program: any, event: any, fetcher: any, onCancel: () => void }) {
    return (
        <fetcher.Form action={`/my-events/${event.slug}/programs`} method="POST" className="grid gap-5 mb-6">
            <h3 className="font-semibold text-lg tracking-tighter">Edit program title</h3>
            <input type="hidden" name="type" value="program.edit" />
            <input type="hidden" name="program_id" value={program.id} />
            <div>
                <Label htmlFor={`program-title-${program.id}`}>Title</Label>
                <Input id={`program-title-${program.id}`} name="title" className="py-5 rounded-lg mt-1 text-sm" defaultValue={program.title} autoFocus />
            </div>
            <div className="flex items-center gap-2">
                <Button className="flex-1">Update program</Button>
                <Button type="button" className="cursor-pointer" variant="secondary" size={'icon'} onClick={onCancel}>
                    <RiCloseLine />
                </Button>
            </div>
        </fetcher.Form>
    );
}

function ItemCreateForm({ program, event, fetcher, onCancel }: { program: any, event: any, fetcher: any, onCancel: () => void }) {
    return (
        <div className="mt-6 p-4 bg-gray-50 rounded border border-gray-100">
            <h3 className="text-md tracking-tight font-medium mb-4">Create new entry</h3>
            <fetcher.Form action={`/my-events/${event.slug}/programs`} method={'POST'}>
                <input type="hidden" name="type" value="program.item.create" />
                <input type="hidden" name="program_id" value={program.id} />
                <div className="grid gap-4">
                    <div>
                        <Label>Heading</Label>
                        <Input name="title" className="py-5 rounded-lg mt-1 text-sm bg-white" placeholder="E.g. Doors Open" autoFocus required />
                    </div>
                    <div>
                        <Label>Content <span className="font-light text-gray-400">(optional)</span></Label>
                        <Textarea name="description" className="rounded-lg mt-1 text-sm bg-white resize-y" placeholder="Add details here..." rows={4} />
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <Button className="flex-1">Add Entry</Button>
                        <Button type="button" className="cursor-pointer" variant="outline" size={'icon'} onClick={onCancel}>
                            <RiCloseLine className="size-4" />
                        </Button>
                    </div>
                </div>
            </fetcher.Form>
        </div>
    );
}

function ItemEditForm({ program, event, fetcher, itemToEdit, onCancel }: { program: any, event: any, fetcher: any, itemToEdit: any, onCancel: () => void }) {
    return (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
            <h3 className="text-md tracking-tight font-medium mb-4">Editing: {itemToEdit.title}</h3>
            <fetcher.Form action={`/my-events/${event.slug}/programs`} method={'POST'}>
                <input type="hidden" name="type" value="program.item.update" />
                <input type="hidden" name="program_id" value={program.id} />
                <input type="hidden" name="item_id" value={itemToEdit.id} />
                <div className="grid gap-4">
                    <div>
                        <Label>Heading</Label>
                        <Input name="title" className="py-5 rounded-lg mt-1 text-sm bg-white" placeholder="Item title" defaultValue={itemToEdit.title} autoFocus required />
                    </div>
                    <div>
                        <Label>Content <span className="font-light text-gray-400">(optional)</span></Label>
                        <Textarea name="description" className="rounded-lg mt-1 text-sm bg-white resize-y" placeholder="Add description here..." rows={6} defaultValue={itemToEdit.description} />
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <Button className="flex-1">Save Changes</Button>
                        <Button type="button" className="cursor-pointer" variant="outline" size={'icon'} onClick={onCancel}>
                            <RiCloseLine className="size-4" />
                        </Button>
                    </div>
                </div>
            </fetcher.Form>
        </div>
    );
}

function EmptyProgramState({ event, fetcher, upgradeTarget, newProgram, setNewProgram }: { event: any, fetcher: any, upgradeTarget: any, newProgram: boolean, setNewProgram: (v: boolean) => void }) {
    return (
        <div className="bg-white rounded">
            {newProgram ? (
                <fetcher.Form action={`/my-events/${event.slug}/programs`} method="POST" className="grid gap-5 text-left">
                    <input type="hidden" name="type" value="program.create" />
                    <div>
                        <Label>Program Title</Label>
                        <Input name="title" className="mt-1" defaultValue={event.title + ' Schedule'} autoFocus />
                    </div>
                    <div className="flex gap-2">
                        <Button>Create</Button>
                        <Button type="button" variant="ghost" onClick={() => setNewProgram(false)}>Cancel</Button>
                    </div>
                </fetcher.Form>
            ) : (
                <>
                    {upgradeTarget ? (
                        <UpgradePlan targetTier={upgradeTarget} featureName="Event program" />
                    ) : (
                        <div>
                            <EmptyState />
                            <div className="mt-4">
                                <Button onClick={() => setNewProgram(true)}>Create Event Program</Button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}