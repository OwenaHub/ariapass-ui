import { Link } from 'react-router'
import { Button } from '../ui/button'
import { BrMd } from '../ui/line-break'

export default function OrganiserPromoCard() {
    return (
        <div
            className="h-90 rounded py-6 px-6 my-8 flex flex-col justify-between"
            style={{
                backgroundImage: `linear-gradient(90deg, #000000, #cccccc00), url('/images/banners/sam-moghadam.jpg')`,
                backgroundSize: 'cover, cover',
                backgroundPosition: 'center, center',
            }}
        >
            <div />
            <div className="text-white">
                <div className="mb-10 tracking-tighter">
                    <h2 className="text-3xl font-bold tracking-tighter mb-4">
                        Get more leads, <br className="md:hidden" /> Pay no fees
                    </h2>
                    <p className="font-light text-sm">Rank higher, skip the fees, and level up your profile — all <BrMd /> for $0/month.</p>
                </div>

                <Link to={"/organisers"}>
                    <Button className="w-full md:w-max rounded-full px-10 py-6 bg-white/20">
                        Become an Organiser
                    </Button>
                </Link>
            </div>
        </div>
    )
}
