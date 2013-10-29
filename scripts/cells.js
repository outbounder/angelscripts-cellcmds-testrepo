var DNA = require("organic").DNA;
var path = require("path")
var _ = require("underscore")

module.exports = function(c, next){
  var dna = new DNA();
  var cwd = c.cwd || path.join(process.cwd(),"dna")
  dna.loadDir(cwd, function(){
    var results = []
    for(var name in dna.cell) {
      var cell = dna.cell[name]
      next("ssh "+cell.remote, "Tissue -action status -target "+cell.target, function(r){
        results.push(r)
        if(results.length == _.keys(dna.cell).length) {
          c.result = results
          next({cells: results})
        }
      })
    }
  });
}
