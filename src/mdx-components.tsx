import type { MDXComponents } from "mdx/types";
import {
  A,
  Button,
  Callout,
  Center,
  Col,
  Columns,
  Embed,
  Figure,
  Gallery,
  H1,
  H2,
  H3,
  H4,
  Img,
  Quote,
  Spacer,
  Stats,
  Wide,
  YouTube,
} from "@/components/blog/mdx-parts";

// Everything here is available inside every .mdx file without importing.
const components: MDXComponents = {
  // markdown elements
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  a: A,
  img: Img,
  // free-style blocks
  Figure,
  Columns,
  Col,
  Gallery,
  Callout,
  Quote,
  Button,
  Stats,
  YouTube,
  Embed,
  Wide,
  Center,
  Spacer,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
