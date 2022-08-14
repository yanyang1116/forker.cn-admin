const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export default {
	namespace: 'authStatus',
	state: {
		isAdmin: false,
		edit: false,
		view: false,
		delete: false,
		create: false,
	},
	reducers: {
		add(state: any) {
			state.num += 1;
		},
	},
	effects: {
		*addAsync(_action: any, { put }: any) {
			yield delay(1000);
			yield put({ type: 'add' });
		},
	},
};
