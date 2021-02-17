import React, { useState, useEffect } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { includes } from 'lodash'
import { withAuth } from '../util/';
import { User } from '../service';
import { Game as Service } from '../service';

const externals = [ 1204, 1209, 1211 ];

const modifiedGAME = [ 1208, 1201, 1211 ];


function Game () {

	const history = useHistory();

	const { id } = useParams();
	const isExternal = externals.includes(+ id);
	const [ iframe, setIframe ] = useState(null);

	const { search } = useLocation();
	// eslint-disable-next-line
	const [ fromHome, setFromHome ] = useState(search.includes('from_home=1'));

	useEffect(() => {

		if (fromHome) {
			history.replace({ search: '' });
		}

	}, [ history, fromHome ]);

	useEffect(() => {

		window.scrollTo(0, 0);

	}, []);

	useEffect(() => {

		const user = User.read();

		
		if(includes(modifiedGAME , Number(id) )){

			setTimeout(() => {
				const reqPC = Service.pcversiongame({
					...user,
					submit_type: 'game_login',
					gameid : id
				}).promise.then(r =>{
					// console.log(r)
					setIframe(r.info);
				} , e =>{
					console.log(e)
				})
	
				return () => reqPC.cancel();
	
			}, 1000);
			
			return 
		}

		const req = Service.activate({
			...user,
			num: 1,
			gameid: id,
		});

		

		function LogIn () {
			Service.login({
				...user,
				num: 1,
				gameid: id,
			}).promise.then(r => {
				console.log(r);
				// setIframe(r.info);
				if (!isExternal) {
					setIframe(r.info);
					console.log(r.info)
				} else {
					if (fromHome) {
						window.location.href = r.info;
					} else {
						history.push('/');
					}
				}
			}, e => {
				console.error('Unable to login to the game', e);
			});

		}

		req.promise.then(r => {

			console.log(r);

			LogIn();

		}, e => {

			if (!e.is_aborted) {

				console.error('Unable to activate the game:', e);

				LogIn();

			}

		});

		return () => req.cancel();

	}, [ history, id, fromHome, isExternal ]);

	return (
		<>
			{iframe ? (
			<iframe 
				style={{ height: 800, overflow: 'auto' }}
				title={`IFRAME-N${id}`}
				src={iframe}>
			</iframe>
			) : null}
		</>
	);

}

export default withAuth(Game, 1);
