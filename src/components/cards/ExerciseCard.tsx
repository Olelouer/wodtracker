import { Exercise } from '@/db/schema';
import { getExerciseIcon } from "@/components/ui/exercise-icon";


interface ExerciseCardProps {
    exercise: Exercise;
    children?: React.ReactNode;
}

const ExerciseCard = ({ exercise, children }: ExerciseCardProps) => {
    const exerciseIcon = getExerciseIcon(exercise);
    return (
        <div
            className="group/item flex items-center justify-between py-2.5 px-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors duration-200"
        >
            <div className="flex items-center gap-3">
                <div className={`flex items-center justify-center w-8 h-8 shadow-sm rounded-full bg-gradient-to-br ${
                    exercise.type.toLowerCase() === 'gymnastic' ? 'from-sky-500 to-blue-500' 
                    : exercise.type.toLowerCase() === 'cardio' ? 'from-rose-500 to-pink-500'
                    : exercise.type.toLowerCase() === 'monostructural' ? 'from-emerald-500 to-teal-500'
                    : 'from-orange-500 to-red-500'
                    }`}
                >
                    <span className="w-4 h-4 text-white flex items-center justify-center">                    
                        {exerciseIcon}
                    </span>
                </div>
                <div className="flex flex-col gap-0.5">
                    <span className="font-semibold text-sm text-foreground">
                        {exercise.name}
                    </span>
                    <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                        {exercise.type}
                    </span>
                </div>
            </div>

            {children && (
                <div className="flex items-center gap-2">
                    {children}
                </div>
            )}     
        </div>
    )
}

export default ExerciseCard