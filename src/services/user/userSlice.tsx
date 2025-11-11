import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserApi } from '/src/services/user/user';

export interface UserInterface {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

const initialState: UserInterface = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
};

export const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    saveUser: (state: UserInterface, action: PayloadAction<UserInterface>) => {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        UserApi.endpoints.getUsers.matchFulfilled,
        (state: UserInterface, action: PayloadAction<UserInterface>) => {
          return { ...state, ...action.payload };
        }
      )
      .addMatcher(
        UserApi.endpoints.patchUser.matchFulfilled,
        (state: UserInterface, action: PayloadAction<UserInterface>) => {
          return { ...state, ...action.payload };
        }
      );
  },
});

export const { saveUser } = UserSlice.actions;

export default UserSlice.reducer;
