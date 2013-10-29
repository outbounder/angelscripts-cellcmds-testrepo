module.exports = function(c, next){
  require("../organic-shellreactor-cellcmds/upgrade")(c, function(remote, commands){
    commands.splice(commands.length-1,0,"BuildAssets")
    next(remote, commands)
  })
}