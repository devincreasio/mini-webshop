import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function ProductSkeleton() {
    return (
        <Card className="flex h-full flex-col">
            <CardContent className="flex-1 p-4">
                <Skeleton className="mb-4 aspect-square w-full" />
                <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-5 w-16" />
                    </div>
                    <Skeleton className="h-8 w-24" />
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <Skeleton className="h-10 w-full" />
            </CardFooter>
        </Card>
    )
}
