import { Timeline } from "@/components/ui/timeline";

export function TimelineDemo() {
    const data = [
        {
            title: "Main Board 2025",
            content: (
                <div>
                    <p className="text-white  dark:text-white text-xs md:text-sm font-normal mb-8">
                        Code club AGPIT 25' is a student-run club at AGPIT. We are a group of
                        students who are passionate about coding and technology.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <img
                            src="https://media.licdn.com/dms/image/v2/D4D22AQGPNW1Kbz403Q/feedshare-shrink_800/feedshare-shrink_800/0/1698422169396?e=1746057600&v=beta&t=hpQi8QNgON864xrByWAl8kdRpWUSiXj4qKTg7ySMHEw"
                            alt="startup template"
                            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                        />
                        <img
                            src="https://media.licdn.com/dms/image/v2/D4D22AQFMgqa2yQ1j4A/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1698422170270?e=1746057600&v=beta&t=dPfee6g5zGsFmEndCW-Bu2WiABb_-kANsz1uVmJDX20"
                            alt="startup template"
                            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                        />
                        <img
                            src="https://media.licdn.com/dms/image/v2/D4D22AQHe5lzz1kymYw/feedshare-shrink_800/feedshare-shrink_800/0/1727535910144?e=1746057600&v=beta&t=DLCGi0XGCazVLTK4PRT_QU8KT6EjU-rasb3UavEJQw0"
                            alt="startup template"
                            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                        />
                        <img
                            src="https://media.licdn.com/dms/image/v2/D4D22AQHkEfjqve-VTA/feedshare-shrink_800/feedshare-shrink_800/0/1708184248303?e=1746057600&v=beta&t=kviEmmTaZ5T7bvwnr5y-86g-iZ0vOIf_37Z9i69RS7c"
                            alt="startup template"
                            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                        />
                    </div>
                </div>
            ),
        },
        {
            title: "Previous Board 2024",
            content: (
                <div>
                    <p className="text-white dark:text-neutral-200 text-xs  md:text-sm font-normal mb-8">
                        The initial board members of the club. Who founded the club and
                        made it what it is today.
                    </p>
                    {/* <p className="text-white dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                        Lorem ipsum is for people who are too lazy to write copy. But we are
                        not. Here are some more example of beautiful designs I built.
                    </p> */}
                    <div className="grid grid-cols-2 gap-4">
                        <img
                            src="https://media.licdn.com/dms/image/v2/D4D22AQG1aCdQcvFdqw/feedshare-shrink_1280/feedshare-shrink_1280/0/1726827655114?e=1746057600&v=beta&t=AXLD7LHGKYocrGbJPQpGbjCwqbObO55We6ZGpp03Ras"
                            alt="hero template"
                            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                        />
                        <img
                            src="https://media.licdn.com/dms/image/v2/D4D22AQEO3BGNYxegZQ/feedshare-shrink_1280/feedshare-shrink_1280/0/1726827655109?e=1746057600&v=beta&t=1IL9PKOXBnE4VFnbByGQRF-YtPrU84VBuZnbeoPLr9c"
                            alt="feature template"
                            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                        />
                        <img
                            src="https://media.licdn.com/dms/image/v2/D4D22AQEj83BzQOGWyQ/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1707081453311?e=1746057600&v=beta&t=bWC4SadF2h3d0I6NDGTWUWBviFqx4rkxxcYEm0s6hrY"
                            alt="bento template"
                            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                        />
                        <img
                            src="https://media.licdn.com/dms/image/v2/D4D22AQG_DAn5-VBgUQ/feedshare-shrink_1280/feedshare-shrink_1280/0/1707081398731?e=1746057600&v=beta&t=A9s_kSb3X40wEY4e2oPjbyn9GilWn4PsC77bLA0qCO8"
                            alt="cards template"
                            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                        />
                    </div>
                </div>
            ),
        },
        {
            title: "Changelog 2024-2025",
            content: (
                <div>
                    <p className="text-white dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
                        Got aligned with Google and Microsoft to make the student community
                        more productive and efficient. We are working on a lot of things.
                    </p>
                    <div className="mb-8">
                        <div className="flex gap-2 items-center text-white dark:text-neutral-300 text-xs md:text-sm">
                            ✅ Conducting workshops on FSD, AI, and ML
                        </div>
                        <div className="flex gap-2 items-center text-white dark:text-neutral-300 text-xs md:text-sm">
                            ✅ Events on MNC Technologies and startups
                        </div>
                        <div className="flex gap-2 items-center text-white dark:text-neutral-300 text-xs md:text-sm">
                            ✅ Open Source Contribution
                        </div>
                        
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <img
                            src="https://media.licdn.com/dms/image/v2/D4D22AQGhb7pbh8Ppdg/feedshare-shrink_800/B4DZTfllkuHkAg-/0/1738917961038?e=1746057600&v=beta&t=Q4lZIve_tTzM9mRh1BSoR8ZsQxZIrd0oWmIM5mV7Cms"
                            alt="hero template"
                            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                        />
                        <img
                            src="https://media.licdn.com/dms/image/v2/D4D22AQHRFIcrzxVrgQ/feedshare-shrink_800/B4DZTfllkVHYAg-/0/1738917960595?e=1746057600&v=beta&t=LNd-2v0f8lV1gVkymsFhMRXEREVdbcW3am9girUA2cY"
                            alt="feature template"
                            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                        />
                        <img
                            src="https://media.licdn.com/dms/image/v2/D5622AQFBkY2W8aWdSg/feedshare-shrink_1280/feedshare-shrink_1280/0/1733839357046?e=1746057600&v=beta&t=T4GmY1wl0ULcaVwdBrT-fKsCf2vjm9Gi7Rgp0mA8SYQ"
                            alt="bento template"
                            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                        />
                        <img
                            src="https://media.licdn.com/dms/image/v2/D4D22AQHRiNJhUHIzsw/feedshare-shrink_800/feedshare-shrink_800/0/1727535907542?e=1746057600&v=beta&t=gSC2jqHrtbqxsrmY6wRR1nAw1nLArz5siVCgRweD0ig"
                            alt="cards template"
                            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                        />
                    </div>
                </div>
            ),
        },
    ];
    return (
        <div className="w-full">
            <Timeline data={data} />
        </div>
    );
}
