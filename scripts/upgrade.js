module.exports = function(c, next){
  require("../organic-shellreactor-cellcmds/upgrade")(c, function(remote, commands){
    commands.push("BuildAssets")
    next(remote, commands)
  })
}