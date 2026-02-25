import { redirect } from 'next/navigation';
import { db } from '@/db';
import { exercises } from '@/db/schema';
import { getWodById } from '@/app/dashboard/actions';
import WodEditorClient from '@/app/wod/[id]/edit/WodEditorClient';

export default async function WodEditPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const workout = await getWodById(Number(id));

    if (!workout) {
        redirect('/dashboard');
    }

    const allExercises = await db.select().from(exercises);
    const exercisesTypes = await db.selectDistinct({ type: exercises.type }).from(exercises);

    return (
        <div>
            <div className="text-center mb-12">
                <h1 className="text-4xl font-black uppercase tracking-tight text-foreground mb-1">
                    Edit WOD
                </h1>
            </div>
            <WodEditorClient
                workout={workout}
                exercises={allExercises}
                exercisesTypes={exercisesTypes}
            />
        </div>
    );
}
