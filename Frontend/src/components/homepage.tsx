import { VelocityScroll } from "@/components/magicui/scroll-based-velocity";
import { cn } from "@/lib/utils";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";

const Homepage = () => {
    return (
        <>
            <div className=" bg-black h-screen w-screen ">
                <div>
            <InteractiveGridPattern
                        className={cn(
                            "[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]",
                            "inset-x-[+44%] inset-y-[+5%]  skew-y-12 ",
                        )}
                    />

                </div>
                <div className=" grid-cols-1 bg-black border-b-0 border-gray-50 sticky top-0 z-50 gradient-to-r flex justify-between items-start w-full px-10 py-3 outline">
                    <div className="logo text-white text-xl pl-40 font-bold">Code Club AGPIT</div>
                    <div className="nav-links flex justify-between items-center w-1/2 pr-40 ">
                        <ul className="flex justify-between items-center w-full">
                            <li className="text-white text-lg font-semibold">Home</li>
                            <li className="text-white text-lg font-semibold">About</li>
                            <li className="text-white text-lg font-semibold">Events</li>
                            <li className="text-white text-lg font-semibold">Members</li>
                        </ul>
                    </div>
                </div>
                <div className="flex justify-center items-center h-full">

                    <div className="relative flex w-full flex-col items-center justify-center ">
                        <VelocityScroll>Code with love :</VelocityScroll>
                        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/2  from-background"></div>
                        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2  from-background"></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Homepage