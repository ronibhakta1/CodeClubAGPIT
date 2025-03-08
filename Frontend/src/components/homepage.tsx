import { Button } from "./ui/button"
import { Skeleton } from "@/components/ui/skeleton"


const Homepage = () => {
    return (
        <>
        <div className="flex flex-col items-center justify-center min-h-svh">
            <h1 className="text-4xl font-bold">Homepage</h1>
            <Button onClick={() => console.log("clicked")}>Click Me</Button>
        </div>
        <Skeleton className="w-[100px] h-[20px] rounded-full" />

        </>
    )
}

export default Homepage