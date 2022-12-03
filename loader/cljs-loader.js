const compileString = require("./cherry-commonjs").default

module.exports = function(source) {
  console.log("Compiling ClojureScript...")
  return compileString(source)
}
