# itunes
Node.js library to access iTunes Search API (music only)

## example
```javascript
var it = new iTunes();

it.search("young thug just might").then(function(results){
   console.log(results);
}).error(function(err){
   console.log(err.message);
});
```
### result
```javascript
{
  resultCount: 1,
  results: 
   [ { wrapperType: 'track',
       kind: 'song',
       artistId: 81886939,
       collectionId: 986011611,
       trackId: 986012237,
       artistName: 'Young Thug',
       collectionName: 'Barter 6',
       trackName: 'Just Might Be',
       collectionCensoredName: 'Barter 6',
       trackCensoredName: 'Just Might Be',
       artistViewUrl: 'https://itunes.apple.com/us/artist/young-thug/id81886939?uo=4',
       collectionViewUrl: 'https://itunes.apple.com/us/album/just-might-be/id986011611?i=986012237&uo=4',
       trackViewUrl: 'https://itunes.apple.com/us/album/just-might-be/id986011611?i=986012237&uo=4',
       previewUrl: 'http://a918.phobos.apple.com/us/r1000/176/Music5/v4/ea/00/35/ea0035e6-9029-c186-9a7f-27ae8a3a0e50/mzaf_8036660511523166534.plus.aac.p.m4a',
       artworkUrl30: 'http://is4.mzstatic.com/image/pf/us/r30/Music5/v4/a8/c1/a6/a8c1a6c0-b6bc-dd23-b60f-2fcc160c814b/075679924872.30x30-50.jpg',
       artworkUrl60: 'http://is3.mzstatic.com/image/pf/us/r30/Music5/v4/a8/c1/a6/a8c1a6c0-b6bc-dd23-b60f-2fcc160c814b/075679924872.60x60-50.jpg',
       artworkUrl100: 'http://is2.mzstatic.com/image/pf/us/r30/Music5/v4/a8/c1/a6/a8c1a6c0-b6bc-dd23-b60f-2fcc160c814b/075679924872.100x100-75.jpg',
       collectionPrice: 7.99,
       trackPrice: 1.29,
       releaseDate: '2015-04-16T07:00:00Z',
       collectionExplicitness: 'explicit',
       trackExplicitness: 'explicit',
       discCount: 1,
       discNumber: 1,
       trackCount: 13,
       trackNumber: 13,
       trackTimeMillis: 232945,
       country: 'USA',
       currency: 'USD',
       primaryGenreName: 'Hip-Hop/Rap',
       contentAdvisoryRating: 'Explicit',
       radioStationUrl: 'https://itunes.apple.com/station/idra.986012237' 
    } ] 
  }
  ```
