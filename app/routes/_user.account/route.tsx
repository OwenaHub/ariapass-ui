import { RiFileUserLine, RiUserLine, RiWallet2Line } from "@remixicon/react"
import { Link, useOutletContext } from "react-router";

export default function AccountMenu() {
    const user: User = useOutletContext();

    const ACCOUNT_MENU = [
        {
            name: "my-profile",
            icon: <RiUserLine />,
            description: "Profile preferences",
            show: true,
        },
        {
            name: "payouts",
            icon: <RiWallet2Line />,
            description: "Bank accounts and payment",
            show: Boolean(user?.organiserProfile),
        },
        {
            name: "Organiser accounts",
            icon: <RiFileUserLine />,
            description: "Manage account statuses",
            show: user?.accountType === 'admin'
        },
    ].filter(item => item.show);

    return (
        <div className="container">
            {ACCOUNT_MENU.map((menu) => (
                <Link key={menu.name} to={`${menu.name}`} className="flex items-center gap-4 mb-3 hover:bg-gray-50 px-1 py-2 rounded">
                    <span className="bg-gray-100 text-primary rounded p-2">
                        {menu.icon}
                    </span>
                    <span className="flex flex-col gap-0 text-sm">
                        <span className="font-semibold capitalize">{menu.name}</span>
                        <span className="font-light">{menu.description}</span>
                    </span>
                </Link>
            ))}
        </div>
    )
}
