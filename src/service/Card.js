import api from './api';

import { getAuthKey } from '../util/';

const api_calls = {
	create: params => api.post('newpwa/center.php/index.php', {
		submit_type: 'bindcard',
		auth: getAuthKey(),
		...params,
	}),
	read: params => api.post('newpwa/ajax_data.php/index.php', {
		type: 'bank_list',
		auth: getAuthKey(),
		...params,
	}),
}

export default api_calls;
