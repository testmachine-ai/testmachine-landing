import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  // Redirect legacy /exchanges/ URL to /products/token-custody/
  throw redirect(301, '/products/token-custody/');
};
