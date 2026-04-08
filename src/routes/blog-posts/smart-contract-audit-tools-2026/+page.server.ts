import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  // Redirect old blog post URL to new structure
  throw redirect(301, '/blog/smart-contract-audit-tools-2026');
};