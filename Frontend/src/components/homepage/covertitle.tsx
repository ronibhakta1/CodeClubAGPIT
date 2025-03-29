import { Cover } from "@/components/ui/cover";

export function CoverDemo() {
    return (
        <div>
            <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center  relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-zinc-700 via-white to-zinc-700 dark:from-white dark:via-white dark:to-zinc-700">
            Shaping Coders, Crafting Futures  <br /> —  <Cover>Code Club AGPIT</Cover>
            </h1>
        </div>
    );
}
