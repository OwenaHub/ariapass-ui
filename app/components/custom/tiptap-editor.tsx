import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { RiBold, RiItalic, RiListOrdered, RiListUnordered, RiH1, RiH2 } from '@remixicon/react'

interface SimpleEditorProps {
    value: string;
    onChange: (content: string) => void;
}

export default function TipTapEditor({ value, onChange }: SimpleEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content: value,
        editorProps: {
            attributes: {
                // Tailwind Typography (prose) is highly recommended here, 
                // but standard Tailwind utility classes work great too!
                class: 'prose prose-sm max-w-none focus:outline-none min-h-[150px] px-4 py-3 text-sm',
            },
        },
        onUpdate: ({ editor }) => {
            // Pass the HTML string up to the parent component
            onChange(editor.getHTML());
        },
    })

    if (!editor) {
        return null;
    }

    return (
        <div className="w-full border border-stone-200 rounded overflow-hidden bg-white focus-within:border-gray-400 focus-within:ring-1 focus-within:ring-gray-400 transition-all">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-1 border-b border-stone-100 bg-stone-50 p-2">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`p-1.5 rounded-lg transition-colors ${editor.isActive('bold') ? 'bg-stone-200 text-slate-900' : 'text-slate-600 hover:bg-stone-200'}`}
                >
                    <RiBold className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`p-1.5 rounded-lg transition-colors ${editor.isActive('italic') ? 'bg-stone-200 text-slate-900' : 'text-slate-600 hover:bg-stone-200'}`}
                >
                    <RiItalic className="w-4 h-4" />
                </button>

                <div className="w-px h-4 bg-stone-300 mx-1" />

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`p-1.5 rounded-lg transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-stone-200 text-slate-900' : 'text-slate-600 hover:bg-stone-200'}`}
                >
                    <RiH1 className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={`p-1.5 rounded-lg transition-colors ${editor.isActive('heading', { level: 3 }) ? 'bg-stone-200 text-slate-900' : 'text-slate-600 hover:bg-stone-200'}`}
                >
                    <RiH2 className="w-4 h-4" />
                </button>

                <div className="w-px h-4 bg-stone-300 mx-1" />

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`p-1.5 rounded-lg transition-colors ${editor.isActive('bulletList') ? 'bg-stone-200 text-slate-900' : 'text-slate-600 hover:bg-stone-200'}`}
                >
                    <RiListUnordered className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`p-1.5 rounded-lg transition-colors ${editor.isActive('orderedList') ? 'bg-stone-200 text-slate-900' : 'text-slate-600 hover:bg-stone-200'}`}
                >
                    <RiListOrdered className="w-4 h-4" />
                </button>
            </div>

            {/* Editing Area */}
            <EditorContent editor={editor} />
        </div>
    )
}