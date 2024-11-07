import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { BaseService } from '../../../services';

function ContestRegistration() {
	const [pendingRegistration, getPendingRegistration] = useState([]);

	useEffect(() => {
		getPedingRegistration();
	}, [])

	/** 
	 * /api/staff/registration
	 * get peding registration
	 * */
	const getPedingRegistration = async () => {
		try {
			const data = await BaseService.post({ url: '/api/staff/registration' });
			console.log(data);
		} catch (error) {
			console.log(error);
			// toast.error(error);
		}
	}

	return (
		<div>
			<p>staff manage contest registration</p>
		</div>
	)
}

export default ContestRegistration
