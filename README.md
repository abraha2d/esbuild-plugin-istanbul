# esbuild-plugin-istanbul

An [esbuild](https://esbuild.github.io/) loader that instruments code with [istanbul/nyc](https://github.com/istanbuljs/nyc).

## Usage

```js
import esbuildPluginIstanbul from 'esbuild-plugin-istanbul';

const jsPlugin = esbuildPluginIstanbul("istanbul-loader-js", /\.[cm]?js$/, "js");
const jsxPlugin = esbuildPluginIstanbul("istanbul-loader-jsx", /\.jsx$/, "jsx");
const tsPlugin = esbuildPluginIstanbul("istanbul-loader-ts", /\.[cm]?ts$/, "ts");
const tsxPlugin = esbuildPluginIstanbul("istanbul-loader-tsx", /\.tsx$/, "tsx");

await esbuild.build({
  plugins: [jsPlugin, jsxPlugin, tsPlugin, tsxPlugin],
});
```
