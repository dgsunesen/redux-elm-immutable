var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var config = require("./webpack.config");

new WebpackDevServer(webpack(config), {
  hot: true,
  historyApiFallback: true,
  contentBase: "http://localhost:3000",
  headers: {"Access-Control-Allow-Origin": "*"},
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  }
}).listen(3000, 'localhost', function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at http://localhost:3000/');
});