import api from './api';

import User from './User';
import { getAuthKey } from '../util/';

const path = `newpwa/ajax_data.php/index.php`;

const data = (params, type) => ({
	...params,
	...User.read(),
	auth: getAuthKey(),
	type,
});

const api_calls = {
	count: params => api.post(path, data(params, `noread_message`)),
	read: params => api.post(path, data(params, `record_list`)),
	readCurrent: params => api.post(path, data(params, `msgcontent`)),
}

export default api_calls
