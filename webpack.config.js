var path = require("path");
var webpack = require("webpack");

var HtmlWebpackPlugin = require("html-webpack-plugin");
var WebpackNotifierPlugin = require("webpack-notifier");

var isProduction = process.env.NODE_ENV === "production";
var isTest = process.env.NODE_ENV === "test";

if (isTest) {
  const jsdomGlobal = require("jsdom-global");
  jsdomGlobal();
}

function addEntries(base) {
  var entries = [];
  if (!isProduction) {
    entries.push(
      "babel-regenerator-runtime",
      "webpack-dev-server/client?http://localhost:3000",
      "webpack/hot/only-dev-server"
    );
  }
  entries.push(
    "react-hot-loader/patch",
    base
  );
  return entries;
}

// Export webpack config object
module.exports = {
  // Switch loaders to debug mode
  debug: !isProduction,

  // Represents the entry point to your web application. Webpack will recursively go
  // through every `require` statement and build out the application's dependency tree
  entry: addEntries("./src/app/main.ts"),

  // The combination of path and filename tells webpack what name to give to the final
  // bundled JavaScript file and where to store this file
  output: {
    filename: "app/main.js",
    path: path.join(__dirname, "dist")
  },

  // Let webpack know what file extensions you plan to `require` in your web application,
  // so you can omit them in the filename
  resolve: {
    extensions: ["", ".ts", ".tsx", ".js", ".jsx"],
  },

  // Options affecting the normal modules
  module: {
    // An array of automatically applied pre-loaders
    preLoaders: [
      // All files with a `.ts` or `.tsx` extension will be linted by `tslint-loader`
      { test: /\.tsx?$/, loader: "tslint" }
    ],

    // An array of automatically applied loaders
    loaders: [
      // All images will be handled by file-loader
      {test: /\.(jpe?g|png|gif|svg)$/i, loader: "file-loader?name=assets/images/[name].[ext]"},

      // All fonts will be handled by file-loader
      {test: /\.(woff|woff2)$/i, loader: "file-loader?name=assets/fonts/[name].[ext]"},

      // All files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loaders: ["babel-loader", "ts-loader"] },

      // Simple html files are handled by `html-loader`
      { test: /\.html$/, loader: "html" },

      // All styles will be handled by style-, css-, sass- and/or postcss loader.
      { test: /\.(css|scss)$/i, loaders: ['style', 'css?modules&importLoaders=1&localIdentName=[path][name]---[local]---[hash:base64:5]&name=styles/[name].[ext]', 'postcss', 'sass'] }
    ]
  },

  // Always enforce TSLint
  tslint: {
    emitErrors: true,
    failOnHint: true,
  }
};

// Add additional plugins to the compiler
if (!isTest) {
  module.exports.plugins = [
    // HMR is a feature to inject updated modules into the active runtime
    new webpack.HotModuleReplacementPlugin(),
    // Generate an index.html file that includes all your webpack bundles in the body
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      minify: isProduction && {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
        collapseInlineTagWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
      },
    }),

    // Define free variables in JavaScript files
    new webpack.DefinePlugin({
      // Make sure the fast version of React is used in production
      "process.env": {
        "NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development"),
      },
    }),

    // Notify you of the build status with your system notifier
    new WebpackNotifierPlugin({
      alwaysNotify: true,
    }),

    // Suppress errors from compiler
    new webpack.NoErrorsPlugin
  ];
}

if (isTest) {
  module.exports.externals = {
    "cheerio": "window",
    "react/lib/ExecutionEnvironment": true,
    "react/lib/ReactContext": true,
    "react/addons": true
  };
}

if (isProduction) {
  // Add plugins for production
  module.exports.plugins.push(
    // Reduce total file size (recommended)
    new webpack.optimize.OccurrenceOrderPlugin,

    // Minify output
    new webpack.optimize.UglifyJsPlugin({
      compressor: { warnings: false },
    })
  );
}
