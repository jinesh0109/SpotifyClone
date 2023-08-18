import DisplaySong from "./DisplaySong";
import MusicPlayer from "./MusicPlayer";
import useSongList from "../utils/useSongList";
import { query } from "../utils/constant";
import { useContext,useEffect } from "react";
import AudioPlayerContext from "./AudioPlayerContext";

const Favourites=()=>{
    const title="Favourites";
    const variables={playlistId:3,search:""};
    const playListFavourites = useSongList(query,variables);
    const {audioContextData, setAudioContextData} = useContext(AudioPlayerContext);

    useEffect(()=>{
        setAudioContextData((prevAudio)=>({
            ...prevAudio,
            favouritesList:playListFavourites,
        }))
    },[playListFavourites])
    return(
        <DisplaySong data={playListFavourites} title={title} playListInd={3}/>
    )
}
export default Favourites;