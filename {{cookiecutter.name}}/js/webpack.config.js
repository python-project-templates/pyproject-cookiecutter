{%- if cookiecutter.pattern == "js" %}
const path = require("path");
const PerspectivePlugin = require("@finos/perspective-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "..", "{{cookiecutter.module}}", "static"),
  },
  resolve: {
    extensions: [".js", ".jsx"],
    fallback: {
      fs: false,
      path: false,
    },
  },

  plugins: [
    new HtmlWebPackPlugin({
      title: "{{cookiecutter.module}}",
      template: "./src/html/index.html",
    }),
    new PerspectivePlugin(),
  ],

  module: {
    rules: [
      {
        test: /\.js(x?)$/,
        enforce: "pre",
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        exclude: /node_modules\/monaco-editor/,
        use: [{loader: "style-loader"}, {loader: "css-loader"}],
      },
    ],
  },
};
{%- elif cookiecutter.pattern == "jupyter" %}
const path = require("path");
const {version} = require("./package.json");

// Custom webpack rules
const rules = [
  {test: /\.js$/, loader: "source-map-loader"},
  {test: /\.css$/, use: ["style-loader", "css-loader"]},
];

// Packages that shouldn't be bundled but loaded at runtime
const externals = ["@jupyter-widgets/base"];

const resolve = {
  // Add '.ts' and '.tsx' as resolvable extensions.
  extensions: [".webpack.js", ".web.js", ".js"],
};

module.exports = [
  /**
   * Notebook extension
   *
   * This bundle only contains the part of the JavaScript that is run on load of
   * the notebook.
   */
  {
    entry: "./src/extension.js",
    output: {
      filename: "index.js",
      path: path.resolve(__dirname, "..", "{{cookiecutter.module}}", "nbextension", "static"),
      libraryTarget: "amd",
    },
    module: {
      rules,
    },
    devtool: "source-map",
    externals,
    resolve,
  },
  {
    // Bundle for the notebook containing the custom widget views and models
    //
    // This bundle contains the implementation for the custom widget views and
    // custom widget.
    // It must be an amd module
    //
    entry: "./lib/index.js",
    devtool: "source-map",
    resolve,
    output: {
      filename: "index.js",
      path: path.resolve(__dirname, "..", "{{cookiecutter.module}}", "nbextension", "static"),
      libraryTarget: "amd",
    },
    module: {
      rules,
    },
    externals: ["@jupyter-widgets/base"],
  },
  /**
   * Embeddable {{cookiecutter.module}} bundle
   *
   * This bundle is almost identical to the notebook extension bundle. The only
   * difference is in the configuration of the webpack public path for the
   * static assets.
   *
   * The target bundle is always `dist/index.js`, which is the path required by
   * the custom widget embedder.
   */
  {
    entry: "./src/index.js",
    output: {
      filename: "index.js",
      path: path.resolve(__dirname, "dist"),
      libraryTarget: "amd",
      library: "{{cookiecutter.module}}",
      publicPath: `https://unpkg.com/{{cookiecutter.module}}@${version}/dist/`,
    },
    devtool: "source-map",
    module: {
      rules,
    },
    externals,
    resolve,
  },
];
{%- endif %}
