import React,{lazy, useState, Suspense, useContext, createContext, useEffect} from "react";
import ReactDOM from "react-dom/client";
import SideBar from "./component/Sidebar";
import { Outlet, RouterProvider, createBrowserRouter} from "react-router-dom";
import ForYou from "./component/ForYou";
import TopTracks from "./component/TopTracks";
import Favourites from "./component/Favourites";
import Recentlyplayed from "./component/RecentlyPlayed";
import MusicPlayer from "./component/MusicPlayer";
import AudioPlayerContext from "./component/AudioPlayerContext";
import MusicPlayerContext from "./component/MusicPlayerContext";
import Error from "./component/Error";
import ColorThief from "../node_modules/colorthief/dist/color-thief.mjs"

const App = ()=>{
    const [audioContextData,setAudioContextData]=useState({
        forYouList:[],
        topTracksList:[],
        favouritesList:[],
        recentlyPlayedList:[],
    })
    const [musicPlayerContextData,setMusicPlayerContextData]=useState({
        trackInd:-1,
        songList:[]
    })
    const [gradientStyle,setGradientStyle]=useState();
    const handleCoverImage = async(img)=>{
        if(img){
            const image = new Image();
            image.crossOrigin = 'Anonymous';
            image.src = `https://corsproxy.io/?${img}`;
            image.onload = () => {
                const colorThief = new ColorThief();
                const color = colorThief.getColor(image);
            
                const cssColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
                const cssColor1 = `rgb(180, 180, 180)`
                const gradientBackground = `linear-gradient(${cssColor},${cssColor1},${cssColor})`;
      
                setGradientStyle( gradientBackground );    
            }
        }
    }
    
    return(
        <div style={{background: gradientStyle?gradientStyle:"black"}} className=" text-white font-sans font-normal flex h-screen">
            <AudioPlayerContext.Provider value={{audioContextData:audioContextData,setAudioContextData:setAudioContextData}}>
                <MusicPlayerContext.Provider value={{musicPlayerContextData:musicPlayerContextData,setMusicPlayerContextData:setMusicPlayerContextData}}>
                    <SideBar/>
                    <Outlet/>
                    <MusicPlayer coverBackgroundImage={handleCoverImage}/>
                </MusicPlayerContext.Provider>
            </AudioPlayerContext.Provider>
        </div>
    )
}
const router = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        errorElement:<Error/>,
        children:[
            {
                path:"/",
                element:<ForYou/>,
            },
            {
                path:"/toptracks",
                element:<TopTracks/>
            },
            {
                path:"/favourites",
                element:<Favourites/>,
            },
            {
                path:"/recentlyplayed",
                element:<Recentlyplayed/>,
            }
        ]
    }
])
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router}/>);