// 1. Handle the CSS import error
declare module 'highlight.js/styles/*.css' {
  const content: any;
  export default content;
}

// 2. Explicitly declare the RSC path for MDX if TS is struggling
declare module 'next-mdx-remote/rsc' {
  import { FC, ReactNode } from 'react';
  
  export interface MDXRemoteProps {
    source: string;
    components?: Record<string, ReactNode | FC<any>>;
    options?: {
      mdxOptions?: {
        remarkPlugins?: any[];
        rehypePlugins?: any[];
        format?: 'md' | 'mdx';
      };
      parseFrontmatter?: boolean;
    };
  }

  export const MDXRemote: FC<MDXRemoteProps>;
}

// 3. Ensure gray-matter is recognized
declare module 'gray-matter' {
  function matter(str: string, options?: any): {
    data: { [key: string]: any };
    content: string;
    excerpt?: string;
    orig: Buffer | string;
  };
  export = matter;
}