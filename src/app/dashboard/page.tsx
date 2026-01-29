import WodListCpn from "@/components/list/WodListCpn";
import {getWods, syncUser} from '@/app/dashboard/actions';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Dashboard = async () => {
    const userId = await syncUser();
    if(!userId) {
        return (
            <div className="w-full flex justify-center">
                <Button>
                    <Link href="/sign-up" className="font-semibold text-lg">Me connecter</Link>
                </Button>
            </div>
        )
    }

    const wods = await getWods();
    return (
        <div>
            <h1 className="title">Dashboard WodTracker</h1>
            <WodListCpn wods={wods}/>
        </div>
    )
}

export default Dashboard;