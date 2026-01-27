import {pgTable, serial, text, integer, timestamp, boolean, pgEnum, primaryKey} from 'drizzle-orm/pg-core';
import {InferSelectModel, relations} from "drizzle-orm";

export const workoutTypeEnum = pgEnum('workout_type', [
    'AMRAP',
    'EMOM',
    'FOR_TIME',
    'TABATA',
    'STRENGTH',
    'HERO',
    'BENCHMARK',
    'SKILL',
    'ACCESSORY'
]);

export const exerciseTypeEnum = pgEnum('exercise_type', [
    'gymnastic',
    'weightlifting',
    'cardio',
    'other'
]);

export const users = pgTable('users', {
    id: text('id').primaryKey(),
    username: text('username').notNull(),
    role: text('role').default('ROLE_USER'),
    createdAt: timestamp('created_at').defaultNow().notNull()
})

export const userSettings = pgTable('user_settings', {
   userId: text('id').primaryKey().references(() => users.id).notNull(),
   weight_unit: text('weight_unit').default('kg'),
   distance_unit: text('distance_unit').default('meters'),
   theme: text('theme').default('dark'),
});

export const workouts = pgTable('workouts', {
    id: serial('id').primaryKey(),
    userId: text('user_id').references(() => users.id),
    title: text('title').default('Custom'),
    description: text('description'),
    date: timestamp('date'),
    type: workoutTypeEnum('type').notNull(),
    isRx: boolean('is_rx').default(true),
    scoreValue: integer('scoreValue'),
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
    type: exerciseTypeEnum('type').notNull(),
});

export type Exercise = InferSelectModel<typeof exercises>;

// Junction Tables
export const workoutExercises = pgTable('workout_exercises', {
    id: serial('id').primaryKey(),
    workoutId: integer('workout_id').references(() => workouts.id).notNull(),
    exerciseId: integer('exercise_id').references(() => exercises.id).notNull(),
    sets: integer('sets'),
    reps: integer('reps'),
    weight: integer('weight'),
    comment: text('comment'),
    createdAt: timestamp('created_at').defaultNow().notNull()
});

export type WorkoutExercise = InferSelectModel<typeof workoutExercises>;

export type WorkoutExerciseDraft = Omit<WorkoutExercise, 'id' | 'workoutId'>;

// Relationships
export const workoutsRelations = relations(workouts, ({many, one}) => ({
    workoutExercises: many(workoutExercises),
    user: one(users, { fields: [workouts.userId] , references: [users.id] })
}));

export const exercisesRelations = relations(exercises, ({many}) => ({
   workoutExercises: many(workoutExercises)
}));

export const workoutExercisesRelations = relations(workoutExercises, ({one}) => ({
    workout: one(workouts, { fields: [workoutExercises.workoutId], references: [workouts.id] }),
    exercise: one(exercises,{ fields: [workoutExercises.exerciseId], references: [exercises.id] }),
}))

export const usersRelations = relations(users, ({one, many}) => ({
    user: one(userSettings, { fields: [users.id], references: [userSettings.userId] }),
    workouts: many(workouts)
}))

export const userSettingsRelations = relations(userSettings, ({one}) => ({
    settings: one(users, { fields: [userSettings.userId], references: [users.id] }),
}))