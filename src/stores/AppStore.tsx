import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/query";
import { AuthApi } from "../../src/services/auth/auth";
import { UserApi } from "../../src/services/user/user";
import { rootReducer } from "./rootReducer";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { ItineraryApi } from "../../src/services/itinerary/itinerary";
import { PaymentApi } from "../../src/services/payments/payment";
import { WeekendApi } from "../../src/services/weekend/weekend";
import { ProfileApi } from "../../src/services/profile/profile";
import { CMSApi } from "../services/cms/cms";
import { UpcomingCruiseApi } from "../services/upcomingCruise/upcomingCruise";
import { GroupEnquiryApi } from "../services/groupEnquiry/groupEnquiry";
import { WebCheckInApi } from "../services/webCheckIn/webCheckIn";

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      AuthApi.middleware,
      UserApi.middleware,
      ItineraryApi.middleware,
      PaymentApi.middleware,
      WeekendApi.middleware,
      CMSApi.middleware,
      UpcomingCruiseApi.middleware,
      ProfileApi.middleware,
      GroupEnquiryApi.middleware,
      WebCheckInApi.middleware,
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
