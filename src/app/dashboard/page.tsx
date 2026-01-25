import WodListCpn from "@/components/list/WodListCpn";
import { getWods } from '@/app/dashboard/actions';

const Dashboard = async () => {
    const wods = await getWods();
    return (
        <div>
            <h1 className="title">Dashboard WodTracker</h1>
            <WodListCpn wods={wods}/>
        </div>
    )
}

export default Dashboard;