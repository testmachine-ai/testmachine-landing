import { error } from '@sveltejs/kit';
import { getPostBySlug } from '$lib/data/blog-posts';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
  const post = getPostBySlug(params.slug);
  if (!post) {
    throw error(404, 'Blog post not found');
  }
  return { post };
};
