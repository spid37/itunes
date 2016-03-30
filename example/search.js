var iTunes = require(__dirname + "/../index.js");

var it = new iTunes();

it.search("young thug just might").then(function(resultData) {
  // add larger image to results
  resultData.results = it.addImages(resultData.results, 600);
  // remove clean duplicates from results.
  resultData.results = it.removeCleanDuplicates(resultData.results);
  console.log(resultData);
}).error(function(err) {
  console.log(err.message);
});
