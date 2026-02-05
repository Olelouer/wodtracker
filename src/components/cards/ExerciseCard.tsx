import { Exercise } from '@/db/schema';
import { Zap, Activity, Dumbbell, Wind, Plus } from 'lucide-react';

const ExerciseCard = ({ exercise, addExercise, picker }: { exercise: Exercise, addExercise: (exercise: Exercise) => void }) => {
    const getExerciseIcon = (exercise: Exercise) => {
        switch(exercise.type) {
            case 'gymnastic': return <Zap className="bg-sky-500/10 border-sky-500/30"/>
            case 'cardio': return <Activity className="bg-rose-500/10"/>
            case 'monostructural': return <Wind className="bg-emerald-500/10"/>
            default: return <Dumbbell className="bg-orange-500/10 border-orange-500/30"/>
        }
    }
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
                        {getExerciseIcon(exercise)}
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
            <button onClick={() => addExercise(exercise)} className="flex items-center justify-center w-7 h-7 rounded-full border border-border bg-background text-muted-foreground opacity-0 group-hover/item:opacity-100 transition-opacity duration-200 cursor-pointer">
                <Plus className="w-4 h-4"/>
            </button>
        </div>
    )
}

export default ExerciseCard