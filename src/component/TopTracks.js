import DisplaySong from "./DisplaySong";
import MusicPlayer from "./MusicPlayer";
import useSongList from "../utils/useSongList";
import { query } from "../utils/constant";
import { useContext,useEffect } from "react";
import AudioPlayerContext from "./AudioPlayerContext";

const TopTracks=()=>{
    const title="Top Tracks";
    const variables={playlistId:2,search:""};
    const playListTopTracks = useSongList(query,variables);
    const {audioContextData, setAudioContextData} = useContext(AudioPlayerContext);

    useEffect(()=>{
        setAudioContextData((prevAudio)=>({
            ...prevAudio,
            topTracksList:playListTopTracks,
        }))
    },[playListTopTracks])

    return(
        <DisplaySong data={playListTopTracks} title={title} playListInd={2}/>
    )
}
export default TopTracks;