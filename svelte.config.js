import adapter from '@sveltejs/adapter-node';
import 'dotenv/config';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		paths: {
			base: process.env['URL_PREFIX']
		},
		csrf: {
			checkOrigin: false,
		}
	}
};

export default config;
