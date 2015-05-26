var request = require('superagent');
var Promise = require("bluebird");
var _ = require("lodash");

function iTunes() {
   this.searchUrl = "https://itunes.apple.com/search";
   this.lookupUrl = "https://itunes.apple.com/lookup";
}

iTunes.prototype.getRequest = function(url,query){
   return new Promise(function(resolve,reject){
      request
      .get(url)
      .accept('application/json')
      .query(query)
      .end(function(err, res){
         if (res && res.ok) {
            var results;
            results = JSON.parse(res.text);
            // console.log(res.text);
            resolve(results);
         }else{
            console.log(res);
            reject(new Error("failed to get data"));
         }
      });
   });
};

iTunes.prototype.removeKeys = function(data){
   var self = this;
   if(!data.results){ return data; }
   var output = [];
   _.forEach(data.results, function(result){
      output.push(_.pick(result,self.pickKeys));
   });
   data.results = output;
   return data;
}

iTunes.prototype.removeCleanDuplicates = function(data){
   var results = [];
   _.forEach(data,function(item){
      if(item.contentAdvisoryRating && item.contentAdvisoryRating == "Clean"){
         // if its a clean check if an Explicit exists
         var dupQuery = {
            "artistId": item.artistId,
            "trackName": item.trackName,
            "contentAdvisoryRating": "Explicit"
         };
         var findResult = _.findWhere(data,dupQuery);
         if(!findResult){
            // no Explicit found add the clean
            results.push(item);
         }
      }else{
         // if it not a clean item dont check for dupes
         results.push(item);
      }
   },results);
   return results;
}

iTunes.prototype.getAlbumsByArtistId = function(artistId,minTracks){
   /*
   * Get albums for an artist
   * added
   */
   var self = this;

   minTracks = (minTracks) ? minTracks : 0;
   var query = {
      "id": artistId,
      "entity": "album",
   };
   return this.getRequest(this.lookupUrl,query).then(function(data){
      // console.log(data.results);
      var albums = _.filter(data.results, function(result){
         // make sure type is collection(album)
         if (result.wrapperType && result.wrapperType != 'collection'){
            return false;
         }
         return (result.trackCount && result.trackCount > minTracks);
      });
      var output = {};
      var artist = _.findWhere(data.results,{"wrapperType":"artist"});
      if(artist){
         output.artist = artist;
      }
      output.albums = albums;
      output.albumCount = albums.length;
      return output;
   });
}

iTunes.prototype.getLargestImage = function(data){

   // need to add?
   // check common image sizes HEAD url to see if valid.

   //var str = "http://is5.mzstatic.com/image/pf/us/r30/Music/3f/e2/57/mzi.jfdzbvtg.100x100-75.jpg";
   // regex (([0-9]{2,3}x[0-9]{2,3})\-(75|50)\.(jpg|png))

}

iTunes.prototype.getTrackById = function(trackId){
   /*
   * Get track by id
   */
   var self = this;
   // make sure the track id is an int
   trackId = parseInt(trackId);
   var query = {
      "id": trackId,
      "entity": "song",
   };
   return this.getRequest(this.lookupUrl,query).then(function(data){
      // console.log(data.results);
      // got track now confirm result exists in results
      var trackConfirm = {"wrapperType": "track", "trackId": trackId};
      var output = _.findWhere(data.results,trackConfirm);
      return output;
   });
}

iTunes.prototype.getAlbumById = function(collectionId){
   /*
   * Get album by id
   */
   var self = this;
   // make sure the track id is an int
   var query = {
      "id": collectionId,
      "entity": "album,song",
   };
   // query to extract only the collection from the results
   var albumConfirm = {
      "wrapperType": "collection",
      "collectionId": collectionId
   };
   // query to extract the tracks from the results
   var getTracks = {
      "wrapperType": "track",
      "collectionId": collectionId
   };
   return this.getRequest(this.lookupUrl,query).then(function(data){
      // extract album from result
      var album = _.findWhere(data.results,albumConfirm);
      if(!album){
         return null;
      }
      // extract tracks from results
      var tracks = _.filter(data.results,getTracks);
      return { "album": album, "tracks": tracks, "trackCount": tracks.length };
   });
}

iTunes.prototype.search = function(search){
   // search for song and album only
   var self = this;
   var query = {
      "term": search,
      //    "entity": "musicArtist,song,album",
      "entity": "song,album",
      "sort": "recent"
      //    "attribute": "artistTerm,albumTerm,songTerm",
   };
   return this.getRequest(this.searchUrl,query).then(function(data){
      // console.log(data.results);
      data.results = self.removeCleanDuplicates(data.results);
      return data;
   });
}

module.exports = iTunes;
