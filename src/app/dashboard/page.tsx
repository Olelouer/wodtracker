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
            <div className="text-center mb-12">
                <h1 className="text-4xl font-black uppercase tracking-tight text-foreground mb-2">WOD Tracker</h1>
                <p className="text-muted-foreground">Track your Crossfit workouts and crush your goals</p>
            </div>
            <WodListCpn wods={wods}/>
        </div>
    )
}

export default Dashboard;