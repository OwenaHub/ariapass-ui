export default function DoodleBar() {
    return (
        <div
            className="h-1 w-full bg-theme sticky top-0"
            style={{
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.2) 10px, rgba(255,255,255,0.2) 20px)'
            }}
        />
    );
}