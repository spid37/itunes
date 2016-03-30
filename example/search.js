var iTunes = require(__dirname + "/index.js");

var it = new iTunes();

it.search("young thug just might").then(function(results) {
  console.log(results);
}).error(function(err) {
  console.log(err.message);
});
