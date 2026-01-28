import WodListCpn from "@/components/list/WodListCpn";
import { getWods } from '@/app/dashboard/actions';
import { currentUser } from '@clerk/nextjs/server'

const Dashboard = async () => {
    const wods = await getWods();
    const user = await currentUser();
    console.log(user);
    return (
        <div>
            <h1 className="title">Dashboard WodTracker</h1>
            <WodListCpn wods={wods}/>
        </div>
    )
}

export default Dashboard;