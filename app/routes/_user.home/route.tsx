import { useOutletContext } from "react-router";
import NavigationSection from "./navigation-section";
import OrganiserProfileStatus from "./organiser-profile-status";


export default function UserDashboard() {
    const user: any = useOutletContext();

    return (
        <div className="container">
            <OrganiserProfileStatus user={user} />
            <NavigationSection user={user} />
        </div>
    );
}