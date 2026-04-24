export default function OutlineButton({ text }: { text?: string }) {
    return (
        <button className="border border-gray-300 bg-white text-gray-700 hover:border-gray-900 hover:text-gray-900 px-8 py-3 rounded font-semibold transition-colors">
            {text || "Click Me"}
        </button>
    )
}
