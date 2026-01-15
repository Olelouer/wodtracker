import {pgTable, serial, text, integer, timestamp, boolean, pgEnum, primaryKey} from 'drizzle-orm/pg-core';
import {relations} from "drizzle-orm";

export const typeEnum = pgEnum('workout_type', ['AMRAP', 'EMOM', 'FOR_TIME', 'TABATA', 'STRENGTH'])

export const workouts = pgTable('workouts', {
    id: serial('id').primaryKey(),
    // userId: text('user_id').notNull(),
    title: text('title').notNull(),
    date: text('date').notNull(),
    isRx: boolean('is_rx').default(true),
    type: typeEnum('type').notNull(),
    createdAt: timestamp('created_at').defaultNow()
});

export const exercises = pgTable('exercises', {
    id: serial('id').primaryKey(),
    name: text('name').notNull().unique(),
});

// Junction Tables
export const workoutExercises = pgTable('workout_exercises', {
    workoutId: integer('workout_id').references(() => workouts.id).notNull(),
    exerciseId: integer('exercise_id').references(() => exercises.id).notNull(),
    reps: integer('reps'),
    weight: integer('weight')
}, (t) => ({
        pk: primaryKey({ columns : [t.workoutId, t.exerciseId] }),
    })
    )

// Relationships
export const workoutsRelations = relations(workouts, ({ many }) => ({
    workoutExercises: many(workoutExercises),
}));

export const exercisesRelations = relations(exercises, ({ many }) => ({
   workoutExercises: many(workoutExercises)
}));

export const workoutExercisesRelations = relations(workoutExercises, ({one}) => ({
    workout: one(workouts, { fields: [workoutExercises.workoutId], references: [workouts.id] }),
    exercise: one(exercises,{ fields: [workoutExercises.exerciseId], references: [exercises.id] }),
}))

