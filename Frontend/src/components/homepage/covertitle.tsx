import { Cover } from "@/components/ui/cover";

export function CoverDemo() {
    return (
        <div>
            <div className="flex items-center justify-center space-x-4 relative z-20 py-6 -mt-20">
                <img src="./agpit_logo.png" className="w-35 h-35" alt="AGPIT Logo" />
                <div className="flex flex-col">
                    <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-zinc-700 via-white to-zinc-700 dark:from-white dark:via-white dark:to-zinc-700">
                        A. G Patil Institute Of Technology
                    </h1>
                    <h2 className="flex justify-center text-2xl md:text-2xl lg:text-3xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-zinc-700 via-white to-zinc-700 dark:from-white dark:via-white dark:to-zinc-700">
                        Computer Engineering Department
                    </h2>
                </div>
            </div>

            <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-zinc-700 via-white to-zinc-700 dark:from-white dark:via-white dark:to-zinc-700">
                Shaping Coders, Crafting Futures  <br /> —  <Cover>Code Club AGPIT</Cover>
            </h1>
        </div>
    );
}
