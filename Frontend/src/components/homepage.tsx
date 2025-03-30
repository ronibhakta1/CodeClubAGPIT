import { CoverDemo } from "./homepage/covertitle";
import { TimelineDemo } from "./homepage/timeline";
import { useNavigate } from "react-router-dom";
const Homepage = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className=" bg-black h-screen w-screen ">
                <div className=" grid-cols-1 bg-black border-b-0 border-gray-50 sticky top-0 z-50 gradient-to-r flex justify-between flex-nowrap items-start w-full px-10 py-3 outline">
                    <div className="flex items-center gap-2">
                        <img src="./logo.png" alt="logo" className="w-10 h-8" />
                    <div className="logo text-white text-xl  font-bold cursor-pointer">CODE CLUB AGPIT</div>
                    </div>
                    <div className="nav-links flex justify-between  items-center w-1/2 pr-40">
                        <ul className="flex justify-between items-center w-full md:text-2xl lg:text-3x">
                            <div>
                                <li className="text-white text-lg font-semibold cursor-pointer" onClick={ () => navigate("/")}>Home</li>
                            </div>
                            <div>
                                <li className="text-white text-lg font-semibold cursor-pointer" onClick={ () => navigate("/about")}>About</li>
                            </div>
                            <div>
                            <li className="text-white text-lg font-semibold cursor-pointer" onClick={ () => navigate("/events")}>Events</li>
                            </div>
                            <div>
                            <li className="text-white text-lg font-semibold cursor-pointer" onClick={ () => navigate("/members")}>Members</li>
                            </div>
                        </ul>
                    </div>
                </div>
                <div>
                <div className="flex flex-col grid-cols-2 items-center justify-center py-40 ">
                    <div><CoverDemo /></div>
                </div>
                    <TimelineDemo />
                </div>
                
            </div>
        </>
    )
}

export default Homepage