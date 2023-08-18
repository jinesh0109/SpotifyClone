import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import profile from "../assets/images/profile.jpeg";
import { useState } from "react";

const SideBar=()=>{
    const [tabInd,setTabInd]=useState(1);
    return(
        <>
            <div className="p-8 flex flex-col items-start">
                    <img className="w-full h-auto" src={logo} alt="Logo"/>
                    <div style={{opacity:tabInd===1?1:0.4}} className="m-4" onClick={()=>setTabInd(1)}>
                        <Link to={`/`}>For You</Link>
                    </div>
                    <div style={{opacity:tabInd===2?1:0.4}} className="m-4" onClick={()=>setTabInd(2)}>
                        <Link to={`/toptracks`}>Top Tracks</Link>
                    </div>
                    <div style={{opacity:tabInd===3?1:0.4}} className="m-4" onClick={()=>setTabInd(3)}>
                        <Link to={`/favourites`}>Favourites</Link>
                    </div>
                    <div style={{opacity:tabInd===4?1:0.4}} className="m-4" onClick={()=>setTabInd(4)}>
                        <Link to={`/recentlyplayed`}>Recently Played</Link>
                    </div>
                    <div className="mt-auto w-12 h-12">
                        <img className="rounded-3xl" src={profile} alt="profile" />
                    </div>
            </div>
        </>
    )
}
export default SideBar;