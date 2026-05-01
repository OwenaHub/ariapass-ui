import { useOutletContext } from "react-router";
import NavigationSection from "./navigation-section";


export default function UserDashboard() {
    const user: any = useOutletContext();

    return (
        <div className="container">
            <NavigationSection user={user} />
        </div>
    );
}