module.exports = function(c, next){
  next("Status", function(r, next){
    if(r.output.pid) {
      next("Upgrade")
    } else
      next("Setup", function(r, next){
        if(r.code)
          next(["Install", "Start"])
        else
          next(new Error("failed to Setup"))
      })
  })
}