export default function PrimaryButton({ text }: { text?: string }) {
    return (
        <button className="bg-theme text-white hover:opacity-50 px-8 py-3 rounded font-semibold transition-all">
            {text || "Click Me"}
        </button>
    )
}
