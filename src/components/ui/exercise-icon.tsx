import { Exercise } from "@/db/schema";
import { Zap, Activity, Dumbbell, Wind } from 'lucide-react';
import { ReactNode } from "react";

export function getExerciseIcon(exercise: Exercise): ReactNode {
    switch(exercise.type) {
        case 'gymnastic': return <Zap className="bg-sky-500/10 border-sky-500/30"/>;
        case 'cardio': return <Activity className="bg-rose-500/10"/>;
        case 'monostructural': return <Wind className="bg-emerald-500/10"/>;
        default: return <Dumbbell className="bg-orange-500/10 border-orange-500/30"/>;
    }
  }
  