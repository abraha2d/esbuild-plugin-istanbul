import { OnLoadArgs, OnLoadOptions, OnLoadResult, Plugin } from "esbuild";
import fs from "fs";

import NYC from "nyc";
import configUtil from "nyc/lib/config-util.js";

export type IstanbulPluginPreloader = (
  args: OnLoadArgs
) => Promise<{ contents: string }>;

export type IstanbulPluginConfig = {
  filter: OnLoadOptions["filter"];
  loader: OnLoadResult["loader"];
  name: Plugin["name"];
  preloader?: IstanbulPluginPreloader;
};

const defaultPreloader: IstanbulPluginPreloader = async (args) => ({
  contents: await fs.promises.readFile(args.path, "utf-8"),
});

export const esbuildPluginIstanbul = ({
  filter,
  loader,
  name,
  preloader,
}: IstanbulPluginConfig): Plugin => ({
  name,
  async setup(build) {
    const { argv } = await configUtil();
    const nyc = new NYC(argv);

    build.onLoad({ filter }, async (args) => {
      if (args.path.includes("node_modules")) return;
      const { contents: inCode } = await (preloader || defaultPreloader)(args);
      const outCode = nyc._transform(inCode, args.path) || inCode;
      return { contents: outCode, loader };
    });
  },
});
