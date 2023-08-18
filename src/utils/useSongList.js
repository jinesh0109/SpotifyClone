import { useEffect, useState } from "react";

 const useSongList=(query,variables)=>{
    const [songList,setSongList]=useState();
    useEffect(()=>{
        getSongs();
    },[])
    async function getSongs(){
        try {
            const res = await fetch('https://api.ss.dev/resource/api',{
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                query:query,
                variables:variables,
                })
            })
            const json = await res.json();
            setSongList(json.data.getSongs);
        } catch (error) {
            console.log(error);
        }
    }
    return songList;
}
export default useSongList;