/**
 * @file
 * 应用的路径别名，该文件会被引入 .umirc 被 umi 使用
 *
 * 注意，这里改了还是不够的，tsconfig 里也要改
 * 主要是如果不改 tsconfig vscode 不能正确的识别到
 *
 * tsconfig 改的时候要把原来 path 的内容也贴进去
 */
export default {
	// '@api': '../src/api/',
	// '@assets': '../src/assets/',
	// '@components': '../src/components',
	// '@hooks': '../src/hooks',
	// '@models': '../src/models',
	// '@pages': '../src/pages',
	// '@typing': '../src/typing',
	// '@utils': '../src/utils',
	// '@': '../src/',
	// '@config/*': `${path.join(__dirname, './')}*`,
	'@config/*': './*',
	// '@config/': '/',
};
