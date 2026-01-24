import { db } from '@/db';
import { workouts, workoutExercises } from '@/db/schema';
import WodListCpn from "@/components/list/WodListCpn";

const Dashboard = async () => {
    const wods = await db.select().from(workouts);

    return (
        <div>
            <h1 className="title">Dashboard WodTracker</h1>
            <WodListCpn wods={wods}/>
        </div>
    )
}

export default Dashboard;