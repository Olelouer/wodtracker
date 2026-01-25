import {pgTable, serial, text, integer, timestamp, boolean, pgEnum, primaryKey} from 'drizzle-orm/pg-core';
import {InferSelectModel, relations} from "drizzle-orm";

export const typeEnum = pgEnum('workout_type', ['AMRAP', 'EMOM', 'FOR_TIME', 'TABATA', 'STRENGTH'])

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    username: text('username').notNull()
})

export const workouts = pgTable('workouts', {
    id: serial('id').primaryKey(),
    // userId: text('user_id').notNull(),
    title: text('title').default('Custom'),
    date: text('date'),
    isRx: boolean('is_rx').default(true),
    // type: typeEnum('type').notNull(),
    createdAt: timestamp('created_at').defaultNow()
});

export type Workout = InferSelectModel<typeof workouts>;

export type WorkoutWithExercises = Workout & {
    workoutExercises: (WorkoutExercise & {
        exercise: Exercise
    })[]
};

export const exercises = pgTable('exercises', {
    id: serial('id').primaryKey(),
    name: text('name').notNull().unique(),
    // type: text('type').notNull()
});

export type Exercise = InferSelectModel<typeof exercises>;

// Junction Tables
export const workoutExercises = pgTable('workout_exercises', {
    id: serial('id').primaryKey(),
    workoutId: integer('workout_id').references(() => workouts.id).notNull(),
    exerciseId: integer('exercise_id').references(() => exercises.id).notNull(),
    reps: integer('reps'),
    weight: integer('weight'),
    createdAt: timestamp('created_at').defaultNow().notNull()
});

export type WorkoutExercise = InferSelectModel<typeof workoutExercises>;

export type WorkoutExerciseDraft = Omit<WorkoutExercise, 'id' | 'workoutId'>;

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

