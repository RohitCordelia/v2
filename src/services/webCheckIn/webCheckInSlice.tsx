import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WebCheckInApi } from './webCheckIn';
export interface WebCheckInInterface {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}
const initialState: WebCheckInInterface = {
    id: '',
    firstName: '',
    lastName: '',
    email: ''
};
export const WebCheckInSlice = createSlice({
    name: 'WebCheckIn',
    initialState,
    reducers: {
        saveWebCheckIn: (state: WebCheckInInterface, action: PayloadAction<WebCheckInInterface>) => {
            return { ...state, ...action.payload };
        }
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                WebCheckInApi.endpoints.getWebCheckInData.matchFulfilled,
                (state: WebCheckInInterface, action: PayloadAction<WebCheckInInterface>) => {
                    return { ...state, ...action.payload };
                }
            )
    },
});
export const { saveWebCheckIn } = WebCheckInSlice.actions;
export default WebCheckInSlice.reducer;