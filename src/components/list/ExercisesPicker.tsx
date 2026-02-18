"use client"
import {Exercise} from "@/db/schema";
import ExerciseCardAdd from "../cards/exercise-cards/ExerciseCardAdd";
import { useMemo, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import ExerciseTypeFilter from "../cards/exercise-cards/ExerciseTypeFilter";

const ExercisesPicker = ({ exercises, addExercise, exercisesTypes }: { exercises: Exercise[], addExercise: (exercise: Exercise) => void, exercisesTypes: { type: string }[] }) => {
    const [selectedType, setSelectedType] = useState<string>('');
    const [search, setSearch] = useState<string>('');
    const filteredExercises = useMemo(() => {
        return exercises.filter(exercise => {
            const isTypeMath = selectedType ? exercise.type.toLowerCase() === selectedType.toLowerCase() : true;
            const isNameMatch = exercise.name.toLowerCase().includes(search.toLowerCase());
            return isTypeMath && isNameMatch;
        });
    }, [exercises, selectedType, search]);

    return (
        <div>
            <h2 className="mt-10 text-lgl font-bold mb-4 uppercase tracking-tight">Exercises</h2>
            <div className="mb-4 relative">
                <Input type="text" placeholder="Search exercises" value={search} onChange={(e) => setSearch(e.target.value)} />
                <Button type="button" 
                    onClick={() => setSearch('')} 
                    className="absolute right-0 top-0 bg-transparent border-none text-black hover:bg-transparent hover:cursor-pointer p-0"
                    disabled={search === ''}
                >
                    <X className="w-4 h-4" />
                </Button>
            </div>
            <ul className="flex gap-2 mb-4">
                <ExerciseTypeFilter label="All" value="" isActive={selectedType === ''} OnClick={setSelectedType} />
                {exercisesTypes && exercisesTypes.length > 0 && exercisesTypes.map(type => (
                    <ExerciseTypeFilter key={type.type} label={type.type.charAt(0).toUpperCase() + type.type.slice(1).toLowerCase()} value={type.type} isActive={selectedType === type.type} OnClick={setSelectedType} />
                ))}
            </ul>
            {filteredExercises && filteredExercises.length > 0 && (
                <p className="text-muted-foreground mt-4 text-sm mb-4 font-semibold uppercase tracking-tight">{filteredExercises.length} exercises</p>
            )}
            <ul className="list-none flex flex-col gap-2">
                {filteredExercises && filteredExercises.length > 0 && filteredExercises.map(exercise => (
                    <ExerciseCardAdd 
                        key={exercise.id} 
                        exercise={exercise} 
                        addExercise={addExercise}
                    />
                ))}
                {filteredExercises.length === 0 && (
                    <li className="text-muted-foreground text-center mt-4 font-semibold">No exercises found matching your criteria</li>
                )}
            </ul>
        </div>
    )
};

export default ExercisesPicker;