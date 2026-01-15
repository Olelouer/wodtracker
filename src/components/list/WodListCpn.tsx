import {Card, CardTitle, CardHeader, CardContent} from '@/components/ui/card';
import { WodList, Wod } from '@/types/wod';

const WodListCpn = ({ wods }: WodList)=> {
    return (
        <ul className="list-none space-y-4">
            {wods.map((wod: Wod) => (
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