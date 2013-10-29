module.exports = function(c, next){
  c.output.write("<hr />")
  if(c.code)
    c.output.write("<b>"+c.code+"</b>")
  c.output.write("<pre>"+JSON.stringify(c, function(key, value) {
    if(typeof value == "object" && value.pid && value.stdout && value.stdin)
      return {pid: value.pid}
    if(typeof value == "object" && value._handle)
      return {handle: true}
    return value
  }, 2)+"</pre>")
}