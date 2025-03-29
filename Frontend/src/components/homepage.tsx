import { CoverDemo } from "./homepage/covertitle";
import { TimelineDemo } from "./homepage/timeline";
import { useNavigate } from "react-router-dom";
const Homepage = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className=" bg-black h-screen w-screen ">
                <div className=" grid-cols-1 bg-black border-b-0 border-gray-50 sticky top-0 z-50 gradient-to-r flex justify-between items-start w-full px-10 py-3 outline">
                <img src="./logo.png" alt="logo" className="w-10 h-8 ml-40" />
                    <div className="logo text-white -ml-105 text-xl justify-between font-bold cursor-pointer">CODE CLUB AGPIT</div>
                    <div className="nav-links flex justify-between items-center w-1/2 pr-40 ">
                        <ul className="flex justify-between items-center w-full">
                            <li className="text-white text-lg font-semibold cursor-pointer" onClick={ () => navigate("/")}>Home</li>
                            <li className="text-white text-lg font-semibold cursor-pointer" onClick={ () => navigate("/about")}>About</li>
                            <li className="text-white text-lg font-semibold cursor-pointer" onClick={ () => navigate("/events")}>Events</li>
                            <li className="text-white text-lg font-semibold cursor-pointer" onClick={ () => navigate("/members")}>Members</li>
                        </ul>
                    </div>
                </div>
                <div>
                <div className="flex flex-col items-center justify-center py-40">
                    <CoverDemo />
                </div>
                    <TimelineDemo />
                </div>
                
            </div>
        </>
    )
}

export default Homepage