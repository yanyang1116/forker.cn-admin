/**
 * @file
 * umi 在 commit stage 阶段 自定义的规则
 * 我不太熟这种配置方法，就把 css、less 的注释掉了
 *
 * TODO 这个晚点要看一下，好像 style 会产生一些影响 比如 webkit-box 不生效
 */
module.exports = {
	'*.{md,json}': ['prettier --cache --write'],
	'*.{js,jsx}': ['max lint --fix --eslint-only', 'prettier --cache --write'],
	'*.{css,less}': [
		// "max lint --fix --stylelint-only",
		// "prettier --cache --write"
	],
	'*.ts?(x)': [
		'max lint --fix --eslint-only',
		'prettier --cache --parser=typescript --write',
	],
};
