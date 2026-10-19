import { adfectionZeroClickSpyware } from "./adfection-zero-click-spyware-through-online-ads";
import { beyondtrustRemoteSupportZeroDay } from "./beyondtrust-remote-support-zero-day";
import type { Post } from "./types";

export const posts: Post[] = [adfectionZeroClickSpyware, beyondtrustRemoteSupportZeroDay].sort((a, b) => b.published.localeCompare(a.published));

export function findPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function postPath(post: Post) {
  return `/blog/${post.slug}/`;
}
