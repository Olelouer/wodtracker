import { db } from '@/db';
import { exercises } from '@/db/schema';
import ExercisesPicker from '@/components/list/ExercisesPicker';

export default async function WodCreatorPage() {
    const allExercises = await db.select().from(exercises);

    return(
        <main>
            <h1>Wod Creator</h1>
            <div>
                <ExercisesPicker exercises={allExercises} />
            </div>
        </main>
    )
}