import { defineConfig } from 'vite';
import path from 'path'; // Ensure you import the 'path' module

// https://vitejs.dev/config/
export default defineConfig(() => {

	return {
		root: 'src/',
		publicDir: '../static/',
		base: './',
		resolve:{
			alias:{
				'@': path.resolve(__dirname, 'static')
			}
		},
		server: {
			fs:{
				allow:['..']
			},
			port:3000,
			host: true,
			open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env),
		},
		build: {
			outDir: '../dist',
			emptyOutDir: true,
            sourcemap: false,
		},
	};
});