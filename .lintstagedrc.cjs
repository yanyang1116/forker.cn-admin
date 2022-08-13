/**
 * @file
 * umi 在 commit stage 阶段 自定义的规则
 * 我不太熟这种配置方法，就把 css、less 的注释掉了，因为它会对 webkit-box 又错误的覆盖
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
