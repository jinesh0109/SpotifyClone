import { createContext } from "react";

const AudioPlayerContext= createContext({
    playlistDetail:{
        playlistInd:1,
        trackInd:0
    },
    forYouList:[],
    topTracksList:[],
    favouritesList:[],
    recentlyPlayedList:[],
})

export default AudioPlayerContext;