declare module "nyc" {
  export function _transform(code: string, filename: string): string | null;
}
