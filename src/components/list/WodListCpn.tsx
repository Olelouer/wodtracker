import {Card, CardTitle, CardHeader, CardContent} from '@/components/ui/card';
import { Workout, Exercise } from '@/db/schema';

const WodListCpn = ({ wod }: Workout[])=> {
    return (
        <ul className="list-none space-y-4">
            {wod.map((wod: Workout => (
                <Card key={wod.id}>
                    <CardHeader>
                        <CardTitle>{wod.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {wod.exercises.map((ex, index) => (
                            <p key={`${ex.name}-${index}`}>{ex.name}</p>
                        ))}
                        <p>{wod.date}</p>
                    </CardContent>
                </Card>
            ))}
        </ul>
    )
}

export default WodListCpn;