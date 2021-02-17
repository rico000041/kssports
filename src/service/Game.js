import api from './api';

import { User } from './';
import { getAuthKey } from '../util/';

const games = [
	{ id: 1201, name: 'IM体育', betting_key: 'im' },
	{ id: 1206, name: 'BTI体育', betting_key: 'bti' },	
	{ id: 1211, name: '沙巴体育' },
	{ id: 1208, name: 'IM电竞', },
];

const api_calls = {
	list: () => games,

	activate: params => api.post('newpwa/ajax_data.php', {
		type: 'active',
		auth: getAuthKey(),
		...params,
	}),

	activateListV1: params => api.post('newpwa/ajax_data.php', {
		type: 'transfer_list_v1',
		auth: getAuthKey(),
		...params,
	}),

	login: params => api.post('newpwa/center.php', {
		submit_type: 'game_mobile_login',
		auth: getAuthKey(),
		...params,
	}),

	login_pc: params => api.post('newpwa/center.php', {
		submit_type: 'game_login',
		auth: getAuthKey(),
		...params,
	}),

	// balance: params => {

	// 	const path = 'newpwa/ajax_data.php/index.php';

	// 	const _params = {
	// 		type: 'get_balance',
	// 		auth: getAuthKey(),
	// 		...params
	// 	};

	// 	const req = api.post(path, {
	// 		gameid: params.id,
	// 		..._params,
	// 	}, {
	// 		done: (response, resolve) => resolve({ game, balance: + response.info }),
	// 		fail: (response, reject) => reject(`Unable to get game ${params.id} balance: ${response}`)
	// 	});

	// },

	getSingleBalance: params => api.post('newpwa/ajax_data.php/index.php', {
		type: 'get_balance',
		auth: getAuthKey(),
		...params
	}),

	balances: params => {

		const path = 'newpwa/ajax_data.php/index.php';

		const _params = {
			type: 'get_balance',
			auth: getAuthKey(),
			...params
		};

		return new Promise((resolve, reject) => {

			const promises = games.map(game => {

				const req = api.post(path, {
					gameid: game.id,
					..._params,
				}, {
					done: (response, resolve) => resolve({ game, balance: + response.info }),
					// fail: (response, reject) => reject(`Unable to get game ${game.id} (${game.name}) balance: ${response}`)
					fail: (response, reject, resolve) => resolve({ game, balance: 0, error: `Unable to get game ${game.id} (${game.name}) balance: ${response}` })
				});

				return req.promise;

			});

			Promise.all(promises).then(values => resolve(values));

		});

	},

	transfer: params => {

		const _transfer = _params => api.post('newpwa/center.php/index.php', {
			submit_type: 'transfer',
			auth: getAuthKey(),
			..._params
		})

		if (params.from === 0) {
			return _transfer({ ...params, transfer_type: `${params.to}01` }).promise;
		}

		if (params.to === 0) {
			return _transfer({ ...params, transfer_type: `${params.from}02` }).promise;
		}

		return new Promise((resolve, reject) => {

			_transfer({
				...params,
				transfer_type: `${params.from}02`,
			}).promise.then(r => {

				console.log(r);

				_transfer({
					...params,
					transfer_type: `${params.to}01`,
				}).promise.then(r => {

					console.log(r);

					resolve({ r, message: 'Money transfer completed successfully' });

				}, e => reject({ e, message: 'Failed to send money to the game' }));

			}, e => reject({ e, message: 'Failed to withdraw money from the game' }));

		});

	},

	quickTransferIn: params => api.post('newpwa/center.php', {
		submit_type: 'quick_transfer_in',
		auth: getAuthKey(),
		...params
	}),

	transferToWallet: () => api.post('newpwa/center.php/index.php', {
		submit_type: 'all_transfer_out',
		...User.read(),
		auth: getAuthKey(),
	}),

	getBettingHistory: params => api.post('newpwa/record.php/index.php', {
		auth: getAuthKey(),
		...params,
	}),

	checkMaintained: params => api.post('newpwa/lobby_login.php', {
		auth: getAuthKey(),
		...params,
	}),

	pcversiongame: params => api.post('newpwa/center.php', {
		auth: getAuthKey(),
		...params,
	}),
}

export default api_calls;
