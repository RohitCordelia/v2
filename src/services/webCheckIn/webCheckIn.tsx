import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Room } from "../../../src/utils/interfaces/itineraryInterface";
import { API_URL } from "../../../src/utils/config";
import { GetAuth } from "../../../src/utils/store/store";
export interface WebCheckInInterface {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}

export const WebCheckInApi = createApi({
    reducerPath: "WebCheckInApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        prepareHeaders: (headers, { getState, endpoint }) => {
            const auth = GetAuth();
            const token = auth.token;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["WebCheckIn"],
    endpoints: (builder) => ({
        getWebCheckInData: builder.mutation<any, any>({
            query: ({ id, data }) => ({
                headers: {
                    'Content-type': 'application/json',
                },
                url: `bookings/${id}/web_checkin`,
                method: 'POST',
                body: data,
            }),
        }),
        getBoardingPass: builder.mutation<any, any>({
            query: ({ id }) => ({
                headers: {
                    'Content-type': 'application/json',
                },
                url: `bookings/boarding_passes?booking_id=${id}`,
                method: 'GET',
            }),
        }),
        saveDeclaration: builder.mutation<any, any>({
            query: (data) => ({
                headers: {
                    'Content-type': 'application/json',
                },
                url: `bookings/save_declaration`,
                method: 'POST',
                body: data,
            }),
        }),
        removeDocument: builder.mutation<any, any>({
            query: ({ id, guest_id }) => ({
                headers: {
                    'Content-type': 'application/json',
                },
                url: `bookings/${id}/remove_document?guest_id=${guest_id}`,
                method: 'POST',
            }),
        }),
        upgradeWebChekinData: builder.mutation<any, any>({
            query: ({ id, data }) => ({
                url: `bookings/${id}/web_checkin_update_guest`,
                method: "POST",
                body: data,
                formData: true
            }),
        }),
        verifyDocument: builder.mutation<any, any>({
            query: ({ id, data }) => ({
                url: `bookings/${id}/verify_document`,
                method: "POST",
                body: data,
                formData: true
            }),
        }),
        guestInfoByUploadDocument: builder.mutation<any, any>({
            query: ({ id, data }) => ({
                url: `itineraries/${id}/guest_info`,
                method: "POST",
                body: data,
                formData: true
            }),
        }),
        profileImgUpload: builder.mutation<any, any>({
            query: ({ id, data }) => ({
                url: `bookings/${id}/face_liveness`,
                method: "POST",
                body: data,
                formData: true
            }),
        }),
        verifyDocumentNumber: builder.mutation<any, any>({
            query: ({ id, data }) => ({
                url: `bookings/${id}/verify_document_number`,
                method: "POST",
                body: data,
                formData: true
            }),
        }),
        verifyOfflinePhoto: builder.mutation<any, any>({
            query: ({ id, data }) => ({
                url: `bookings/${id}/verify_offline_photo`,
                method: "POST",
                body: data,
                formData: true
            }),
        }),
    }),
});
export const {
    useGetWebCheckInDataMutation,
    useGetBoardingPassMutation,
    useSaveDeclarationMutation,
    useUpgradeWebChekinDataMutation,
    useVerifyDocumentMutation,
    useProfileImgUploadMutation,
    useRemoveDocumentMutation,
    useVerifyDocumentNumberMutation,
    useVerifyOfflinePhotoMutation,
    useGuestInfoByUploadDocumentMutation
} = WebCheckInApi;