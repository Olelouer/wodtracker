"use server"

import { db } from '@/db';
import { users, workouts } from '@/db/schema';
import { currentUser } from '@clerk/nextjs/server';
import { and, desc, eq } from 'drizzle-orm';
import { checkUser } from '@/app/actions';

export async function getWods()  {  
    const checkUserResult = await checkUser();
    if(!checkUserResult.success) return checkUserResult;

    try {
        return await db.query.workouts.findMany({
            where: eq(workouts.userId, checkUserResult.user!.id),
            with: {
                workoutExercises: {
                    with: {
                        exercise: true
                    },
                }
            },
            orderBy: [desc(workouts.date)]
        });
    } catch(e) {
        console.error(e);
        return [
            {
                success: false,
                error: 'Erreur lors de la récupération des workouts'
            }
        ];
    }
}

export async function syncUser() {
    const activeUser = await currentUser();
    if(!activeUser) return {};

    const existingUser = await db.query.users.findFirst({
        where: eq(users.id, activeUser.id)
    });

    if (!existingUser) await db.insert(users).values({
        id: activeUser.id,
        username: activeUser.username || `${activeUser.firstName} ${activeUser.lastName}`
    });

    return activeUser.id;
}

export async function getWodById(id: number) {
    const checkUserResult = await checkUser();
    if (!checkUserResult.success) return null;

    try {
        return await db.query.workouts.findFirst({
            where: and(eq(workouts.id, id), eq(workouts.userId, checkUserResult.user!.id)),
            with: {
                workoutExercises: {
                    with: {
                        exercise: true,
                    },
                },
            },
        });
    } catch (e) {
        console.error(e);
        return null;
    }
}

export async function deleteWod(wodId: number) {
    const checkUserResult = await checkUser();
    if(!checkUserResult.success) return checkUserResult;

    try {
        await db.delete(workouts).where(and(eq(workouts.id, wodId), eq(workouts.userId, checkUserResult.user!.id)));
        return {
            success: true,
            message: 'Workout deleted successfully'
        };
    } catch(e) {
        console.error(e);
        return {
            success: false,
            error: 'Erreur lors de la suppression du workout'
        };
    }
}