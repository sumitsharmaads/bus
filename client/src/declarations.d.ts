// declarations.d.ts
// declare module "*.svg" {
//   const content: React.FC<React.SVGProps<SVGSVGElement>>;
//   export default content;
// }

declare module "*.svg" {
  import { FC, SVGProps } from "react";
  const ReactComponent: FC<SVGProps<SVGSVGElement>>;
  export { ReactComponent };
}
