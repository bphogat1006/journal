import adapter from '@sveltejs/adapter-node';
import dotenv from 'dotenv'

if (process.env.NODE_ENV === 'development') {
	dotenv.config({path: './.env.development'})
} else {
	// dotenv.config({path: './.env.production'})
}

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
