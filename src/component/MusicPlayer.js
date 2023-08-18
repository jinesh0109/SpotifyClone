import listDisplay from "../assets/images/listDisplay.png";
import next from "../assets/images/next.png";
import pause from "../assets/images/pause.png";
import play from "../assets/images/play.png";
import previous from "../assets/images/previous.png";
import volume from "../assets/images/volume.png";
import React,{useEffect, useRef, useState,useContext} from "react";
import MusicPlayerContext from "./MusicPlayerContext";
import Spinner from "./Spinner";

const MusicPlayer = ({coverBackgroundImage})=>{

    const {musicPlayerContextData, setMusicPlayerContextData} = useContext(MusicPlayerContext);

    const [isPlaying,setIsPlaying] = useState(false);
    const [trackInd,setTrackInd] = useState();
    const [trackProgress,setTrackProgress] = useState(0);
    const [data,setData]=useState([]);
    const [isLoading,setIsLoading]=useState(true)

    useEffect(()=>{
        setData(musicPlayerContextData?.songList)
        setTrackInd(musicPlayerContextData?.trackInd)

    },[musicPlayerContextData])

    useEffect(()=>{
        if(data[trackInd]?.photo){
            coverBackgroundImage(data[trackInd]?.photo)
            setIsLoading(false)
        }
    },[trackInd])
    

    const audioRef = useRef(new Audio(data?data[trackInd]?.url:null));
    const intervalRef = useRef();
    const isReady = useRef(false);
    
    const durationTime = audioRef.current.duration;

    const prevTrack = ()=>{
        if(trackInd-1<0){
            setTrackInd(data.length-1);
        }
        else{
            setTrackInd(trackInd-1);
        }
    }
    const nextTrack = ()=>{
        if(trackInd < data.length-1){
            setTrackInd(trackInd+1);
        }
        else{
            setTrackInd(0);
        }
    }
    const startTimer=()=>{
        clearInterval(intervalRef.current);
        intervalRef.current  = setInterval(()=>{
            if(audioRef.current.ended){
                nextTrack();
            }
            else{
                setTrackProgress(audioRef.current.currentTime);   
            }
        },[1000])
    }
    const onScrub=(value)=>{
        clearInterval(intervalRef.current);
        audioRef.current.currentTime=value;
        setTrackProgress(audioRef.current.currentTime);
    }
    const onScrubEnd=()=>{
        if(!isPlaying){
            setIsPlaying(true);
        }
        startTimer();
    }
    useEffect(()=>{
        if(isPlaying){
            
            isReady.current=true;
            audioRef.current.play();
            startTimer();
        }
        else{
            clearInterval(intervalRef.current);
            audioRef.current.pause();
        }
    },[isPlaying])

    useEffect(()=>{
        audioRef.current.pause();
        audioRef.current = new Audio(data?data[trackInd]?.url:null);
        setTrackProgress(audioRef.current.currentTime);

        if(isReady.current){
            audioRef.current.play();
            setIsPlaying(true);
            startTimer();    
        }    
    },[trackInd])

    return isLoading ? <div className="m-auto"><Spinner /></div> :
    (
        <div className="px-8 mx-20 my-20 ">
            <div className="flex flex-col items-start max-w-lg md:max-h-screen-md lg:max-h-screen-lg xl:max-h-screen-xl">
                <div>
                    <div className="font-bold text-3xl">{data?data[trackInd]?.title:null}</div>
                    <div className="text-sm opacity-60 my-3">{data?data[trackInd]?.artist:null}</div>
                </div>
                <div>
                    <img className="my-3 w-[480px] max-h-[450px]" src={data?data[trackInd]?.photo:null} alt="album photo"/>
                </div>
                <input className="w-full my-2" type="range" value={trackProgress} step="1" onChange={(e)=>onScrub(e.target.value)}
                    min="0" max={durationTime ? durationTime : `${durationTime}`} onKeyUp={onScrubEnd} onMouseUp={onScrubEnd}/>    
                <div className="flex justify-between w-full">
                    <button><img src={listDisplay} alt="... btn"/></button>
                    <div className="flex items-center">
                        <button className="mx-4" onClick={prevTrack}><img src={previous} alt="previous btn"/></button>
                        {isPlaying ? (
                                <button className="mx-4" onClick={()=>setIsPlaying(false)}><img src={play} alt="play btn"/></button>
                            ):(
                                <button className="mx-4" onClick={()=>setIsPlaying(true)}><img src={pause} alt="pause btn"/></button>
                        )}
                        <button className="mx-4" onClick={nextTrack}><img src={next} alt="next btn"/></button>
                    </div>
                    <button><img src={volume} alt="volumn btn"/></button>
                </div>
            </div>
        </div>
    )
}
export default MusicPlayer;