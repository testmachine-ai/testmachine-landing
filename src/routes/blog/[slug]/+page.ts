import { error } from '@sveltejs/kit';
import { blogPosts, getPostBySlug } from '$lib/data/blog-posts';
import type { EntryGenerator, PageLoad } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => {
  return blogPosts.map((post) => ({ slug: post.slug }));
};

export const load: PageLoad = ({ params }) => {
  const post = getPostBySlug(params.slug);
  if (!post) {
    throw error(404, 'Blog post not found');
  }
  return { post };
};
