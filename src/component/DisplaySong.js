import { useContext, useEffect, useState } from "react";
import searchIcon from "../assets/images/searchIcon.png"
import MusicPlayerContext from "./MusicPlayerContext";
import Spinner from "./Spinner";

const DisplaySong = (props)=>{
    const [title,setTitle]=useState();
    const [playListInd,setPlayListInd]=useState();
    const [searchText,setSearchText] = useState("");
    const [data,setData]=useState([]);
    const [filterData,setFilterData]=useState([]);
    const {musicPlayerContextData,setMusicPlayerContextData}=useContext(MusicPlayerContext);
    const [isLoading,setIsLoading]=useState(true);

    const handleFilter=(e)=>{
        setSearchText(e.target.value);
        const filterData = data.filter((val)=>val.title.toLowerCase().includes(e.target.value.toLowerCase()));
        setFilterData(filterData);
    }
    const setMusicContext=(ind)=>{
        let currentInd=ind;
        for(let i=0;i<data.length;i++){
            if(data[i].title===filterData[ind].title){
                currentInd=i;
                break;
            }
        }
        setMusicPlayerContextData((prevMusic)=>({  
            ...prevMusic,
            trackInd:currentInd,
            songList:data,
        }))
    }
    
    useEffect(()=>{
        if(props.data){
            setTitle(props.title);
            setPlayListInd(props.playListInd)
            setData(props.data);
            setFilterData(props.data);
            setIsLoading(false);
        }
    },[props])
    
    return isLoading?<div className="m-auto"><Spinner/></div>:
    (
        <>
            <div className="p-8 mx-10 flex flex-col items-start">
                <div className="font-bold text-3xl">{title}</div>
                <div className="flex justify-between items-center p-3 bg-white mt-4 w-[432px] h-auto rounded-lg overflow-hidden">
                    <input className="text-black outline-none" type="text" placeholder="Search Song, Artist" name="searchText" value={searchText} 
                        onChange={(e)=>{handleFilter(e)}}/>
                    <img className="h-4 m-1" src={searchIcon} alt="search icon"/>
                </div>
                <div className="my-10 overflow-auto pr-3">
                    {filterData.map((list,ind)=>{
                        return(
                            <div key={list.title} className="flex justify-between items-center w-[432px]"
                                >
                                <div className="flex m-2 cursor-pointer" onClick={()=>setMusicContext(ind)}>
                                    <div>
                                        <img className="w-12 h-12 rounded-full" src={list.photo} alt="song picture"/>
                                    </div>
                                    <div className="flex flex-col mx-2">
                                        <div className="text-lg">{list.title} </div>
                                        <div className="text-sm opacity-60">{list.artist}</div>
                                    </div>
                                </div>
                                <div className="text-lg opacity-60">{Math.floor(list.duration/60)+`:`+(list.duration%60)}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
export default DisplaySong;