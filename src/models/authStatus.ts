import { message } from 'antd';
import { authStatus } from '../api/common/index';

export default {
	namespace: 'authStatus',
	state: {
		inited: false,
		edit: false,
		view: false,
		delete: false,
		create: false,
	},
	reducers: {
		setAuth(state: IAuthStatus, payload: IAuthStatus) {
			return {
				...state,
				...payload,
			};
		},
	},
	effects: {
		*reqAuth({ payload }: any, { put, call }: any): any {
			try {
				const res = yield call(authStatus, payload);
				yield put({ type: 'setAuth', payload: res });
			} catch (err) {
				message.error(
					typeof err === 'string'
						? err
						: (err as IResponseError).message ?? JSON.stringify(err)
				);
			}
		},
	},
};
