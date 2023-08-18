import DisplaySong from "./DisplaySong";
import MusicPlayer from "./MusicPlayer";
import useSongList from "../utils/useSongList";
import { query } from "../utils/constant";
import { useContext,useEffect } from "react";
import AudioPlayerContext from "./AudioPlayerContext";

const Recentlyplayed=()=>{
    const title="Recently Played";
    const variables={playlistId:4,search:""};
    const playListRecentlyplayed = useSongList(query,variables);
    const {audioContextData, setAudioContextData} = useContext(AudioPlayerContext);

    useEffect(()=>{
        setAudioContextData((prevAudio)=>({
            ...prevAudio,
            recentlyPlayedList:playListRecentlyplayed

        }))
    },[playListRecentlyplayed])

    return(
        <DisplaySong data={playListRecentlyplayed} title={title} playListInd={4}/>
    )
}
export default Recentlyplayed;