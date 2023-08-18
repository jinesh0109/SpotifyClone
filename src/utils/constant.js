export const query=`query Query($playlistId:Int!,$search:String) {
    getSongs(playlistId: $playlistId,search:$search) {
      _id
      title
      photo
      url
      duration
      artist
    }
  }`