import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  // Redirect to new blog structure
  throw redirect(301, '/blog/ai-smart-contract-auditing-2026');
};