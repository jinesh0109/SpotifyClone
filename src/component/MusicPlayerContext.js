import { createContext } from "react";

const MusicPlayerContext= createContext({
    trackInd:-1,
    songList:[],
})

export default MusicPlayerContext;