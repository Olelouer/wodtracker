import { db } from '@/db';
import { exercises } from '@/db/schema';
import WodCreatorClient from "@/app/wod-creator/WodCreatorClient";

export default async function WodCreatorPage() {
    const allExercises = await db.select().from(exercises);

    return(
        <div>
            <div className="text-center mb-12">
                <h1 className="text-4xl font-black uppercase tracking-tight text-foreground mb-2">WOD Creator</h1>
                <p className="text-muted-foreground"></p>
            </div>
            <WodCreatorClient exercises={allExercises} />
        </div>
    )
}