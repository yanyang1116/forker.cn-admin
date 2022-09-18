/**
 * @file
 * useFetch
 *
 * TODO，以后一定要封装一个
 * 在客户端封装吧，这里我还是想简单点
 */

interface Result {
	data: any;
	error: string;
	loading: boolean;
}

export default (fn: Promise<any>, { ...rest }): Result => {
	// try {
	// 	await fn(...rest)
	// } catch (err) {
	// }
	// fn;
	// const [loading, setLoading] = useEffect(false);
	// await fn();
	// return
};
