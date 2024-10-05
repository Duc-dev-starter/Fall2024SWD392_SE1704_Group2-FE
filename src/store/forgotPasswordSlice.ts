import { createSlice } from '@reduxjs/toolkit';

interface ForgotPasswordDialog {
	isSentEmail: boolean;
}

const initialState: ForgotPasswordDialog = {
	isSentEmail: false,
};

const forgotPass = createSlice({
	name: 'forgotPassword',
	initialState,
	reducers: {
		showModal: (state) => {
			state.isSentEmail = true;
		},
		hideModal: (state) => {
			state.isSentEmail = false;
		},
	},
});

export const { showModal, hideModal } = forgotPass.actions;
export default forgotPass.reducer;
