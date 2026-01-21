import { db } from '@/db';
import { exercises } from '@/db/schema';
import WodCreatorClient from "@/app/wod-creator/WodCreatorClient";

export default async function WodCreatorPage() {
    const allExercises = await db.select().from(exercises);

    return(
        <main>
            <h1>Wod Creator</h1>
            <WodCreatorClient exercises={allExercises} />
        </main>
    )
}