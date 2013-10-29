var path = require("path")
module.exports = function(plasma) {
  plasma.on("upload", function(c, next){
    c.commands.push("ssh "+c.cell.remote+" 'mkdir -p "+c.cell.cwd+"'")
    c.commands.push("scp -r "+process.cwd()+" "+c.cell.remote+":"+c.cell.cwd)
    next && next(c)
  })
}