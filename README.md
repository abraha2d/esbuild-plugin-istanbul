# esbuild-plugin-istanbul

An [esbuild](https://esbuild.github.io/) loader that instruments code with [istanbul/nyc](https://github.com/istanbuljs/nyc).

## Usage

```js
import esbuildPluginIstanbul from "esbuild-plugin-istanbul";

const jsPlugin = esbuildPluginIstanbul({
  filter: /\.[cm]?js$/,
  loader: "js",
  name: "istanbul-loader-js",
});

const jsxPlugin = esbuildPluginIstanbul({
  filter: /\.jsx$/,
  loader: "jsx",
  name: "istanbul-loader-jsx",
});

const tsPlugin = esbuildPluginIstanbul({
  filter: /\.[cm]?ts$/,
  loader: "ts",
  name: "istanbul-loader-ts",
});

const tsxPlugin = esbuildPluginIstanbul({
  filter: /\.tsx$/,
  loader: "tsx",
  name: "istanbul-loader-tsx",
});

await esbuild.build({
  plugins: [jsPlugin, jsxPlugin, tsPlugin, tsxPlugin],
});
```
