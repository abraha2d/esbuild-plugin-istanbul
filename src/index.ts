import { OnLoadArgs, OnLoadOptions, OnLoadResult, Plugin } from "esbuild";
import fs from "fs";
import nyc from "nyc";

const istanbulLoader = async (args: OnLoadArgs) => {
  const inCode = await fs.promises.readFile(args.path, "utf-8");
  return nyc._transform(inCode, args.path) || inCode;
};

const pluginFactory = (
  name: Plugin["name"],
  filter: OnLoadOptions["filter"],
  loader: OnLoadResult["loader"]
): Plugin => ({
  name,
  async setup(build) {
    build.onLoad({ filter }, async (args) => {
      if (args.path.includes("node_modules")) return;
      const contents = await istanbulLoader(args);
      return { contents, loader };
    });
  },
});

export default pluginFactory;
