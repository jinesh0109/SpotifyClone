import { useState,useContext, useEffect, useRef } from "react";
import DisplaySong from "./DisplaySong";
import MusicPlayer from "./MusicPlayer";
import useSongList from "../utils/useSongList";
import { query } from "../utils/constant";
import AudioPlayerContext from "./AudioPlayerContext";
import MusicPlayerContext from "./MusicPlayerContext";

const ForYou=()=>{
    const title="For You";
    const variables={playlistId:1,search:""};
    const playListForYou = useSongList(query,variables);
    const {audioContextData, setAudioContextData} = useContext(AudioPlayerContext);
    const {setMusicPlayerContextData}=useContext(MusicPlayerContext);
    const firstFetch = useRef(true);

    useEffect(()=>{
        setAudioContextData((prevAudio)=>({
            ...prevAudio,
            forYouList:playListForYou,
        }))
        if(firstFetch.current && playListForYou?.length>0){
            setMusicPlayerContextData((prevMusic)=>({
                ...prevMusic,
                trackInd:0,
                songList:playListForYou
            }))
            firstFetch.current=false
        }
    },[playListForYou])
    
    return(    
        <DisplaySong data={playListForYou} title={title} playListInd={1}/>
    )
}
export default ForYou;