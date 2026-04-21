import client from "@/lib/client";
import type { BlogPost } from "./post.model";

export const getPosts = async (): Promise<BlogPost[]> => {
  const posts = await client.getContentList<BlogPost>({
    contentType: "blog-post",
  });

  return posts;
};
