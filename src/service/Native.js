import api from './api';

import { getAuthKey } from '../util/';

const api_calls = {
	getSportsCount: params => api.post('imnativedata/ajax_data.php' , {
        type: "get_all_sports_count",
        auth: getAuthKey(),
        ...params
    }),
    getSportsData: params => api.post('imnativedata/ajax_data.php', {
        type: "get_sports_data",
        auth: getAuthKey(),
        ...params
    }),
    eventSearch: params => api.post('imnativedata/ajax_data.php', {
        type: "event_search",
        auth: getAuthKey(),
        ...params
    }),
    bet: params => api.post('imnativedata/ajax_data.php', {
        type: "bet",
        auth: getAuthKey(),
        ...params
    })
}

export default api_calls