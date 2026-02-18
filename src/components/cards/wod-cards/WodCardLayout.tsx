import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface WodCardLayoutProps {
    header?: React.ReactNode;
    content?: React.ReactNode;
    footer?: React.ReactNode;
    className?: string;
}

const WodCardLayout = ({ header, content, footer, className }: WodCardLayoutProps) => {
    return (
        <Card className={cn("group relative overflow-hidden border-0 bg-card shadow-lg hover:shadow-xl transition duration-300", className)}>
            <div className="absolute left-0 top-0 h-full w-1.5 bg-linear-to-b from-brand via-brand-accent to-brand"/>
            {header && (
                <CardHeader className="pb-4 pl-6">  
                    {header}
                </CardHeader>
            )}
            {content && (
                <CardContent className="space-y-4 pl-6">
                    {content}
                </CardContent>
            )}
            {footer && (
                <CardFooter className="mt-auto space-y-4 w-full px-4">
                    {footer}
                </CardFooter>
            )}
        </Card>
    )
}

export default WodCardLayout