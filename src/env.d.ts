/// <reference types="astro/client" />

declare module "*?jsx" {
  const Cmp: import("@qwik.dev/core").FunctionComponent<
    Omit<
      import("@qwik.dev/core").QwikIntrinsicElements["img"],
      "src" | "width" | "height" | "srcSet"
    >
  >;
  export default Cmp;
  export const width: number;
  export const height: number;
  export const srcSet: string;
}

declare module "*&jsx" {
  const Cmp: import("@qwik.dev/core").FunctionComponent<
    Omit<
      import("@qwik.dev/core").QwikIntrinsicElements["img"],
      "src" | "width" | "height" | "srcSet"
    >
  >;
  export default Cmp;
  export const width: number;
  export const height: number;
  export const srcSet: string;
}
