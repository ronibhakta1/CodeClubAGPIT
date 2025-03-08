import { Button } from "./ui/button"

const Homepage = () => {
    return (
        <>
        <div className="flex flex-col items-center justify-center min-h-svh">
            <h1 className="text-4xl font-bold">Homepage</h1>
            <Button onClick={() => console.log("clicked")}>Click Me</Button>
        </div>
        </>
    )
}

export default Homepage