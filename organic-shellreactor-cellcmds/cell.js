var DNA = require("organic").DNA;
var path = require("path")
var _ = require("underscore")

module.exports = function(c, next){
  var dna = new DNA();
  var cwd = c.cwd || path.join(process.cwd(),"dna")
  dna.loadDir(cwd, function(){
    var name = c.value.shift()
    if(!dna.cell[name]) 
      return next(new Error(name+" cell not found in dna/cell"))
    _.extend(c, dna.cell[name])
    if(c.nodeSource) {
      var oTC = c.transformCommands
      c.transformCommands = function(value){
        var newValue = [c.nodeSource]
        if(typeof value == "string")
          newValue.push(value)
        if(Array.isArray(value))
          newValue = newValue.concat(value)
        return oTC(newValue)
      }
    }
    next(c)
  });
}
