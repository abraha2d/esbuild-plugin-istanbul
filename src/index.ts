import { OnLoadArgs, OnLoadOptions, OnLoadResult, Plugin } from "esbuild";
import fs from "fs";
import nyc from "nyc";

export type IstanbulPluginPreloader =
  | ((args: OnLoadArgs) => Promise<{ contents: string }>)
  | undefined;

export type IstanbulPluginConfig = {
  filter: OnLoadOptions["filter"];
  loader: OnLoadResult["loader"];
  name: Plugin["name"];
  preloader?: IstanbulPluginPreloader;
};

const defaultPreloader: IstanbulPluginPreloader = async (args) => ({
  contents: await fs.promises.readFile(args.path, "utf-8"),
});

const istanbulLoader = async (
  args: OnLoadArgs,
  preloader: IstanbulPluginPreloader
) => {
  if (!preloader) preloader = defaultPreloader;
  const { contents: inCode } = await preloader(args);
  return nyc._transform(inCode, args.path) || inCode;
};

const esbuildPluginIstanbul = ({
  filter,
  loader,
  name,
  preloader,
}: IstanbulPluginConfig): Plugin => ({
  name,
  async setup(build) {
    build.onLoad({ filter }, async (args) => {
      if (args.path.includes("node_modules")) return;
      const contents = await istanbulLoader(args, preloader);
      return { contents, loader };
    });
  },
});

export default esbuildPluginIstanbul;
