import api from './api';

import { getAuthKey } from '../util/';

const api_calls = {
	read: params => api.post('newpwa/ajax_data.php/index.php', {
		type: 'record_list',
		auth: getAuthKey(),
		...params,
	}),
}

export default api_calls;