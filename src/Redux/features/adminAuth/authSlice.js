import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { getProfileDetailsService } from "../../../Services/StudentServices";
// import { getProfileDetailsService, LoginService } from "../../../Services/AdminServices";
import { getItemLocalStorage } from "../../../Utils/browserServices";
import { LoginService, getProfileDetailsService } from "../../../Services/LoginServices/authServices";
// import { getNotificationService } from "../../../Services/AdminServices/authService";


const initialState = {
    loading: false,
    token: "",
    profileDetails: {},
    notificationList: [],
    error: "",
};

export const profileDetails = createAsyncThunk(
    "auth/profileDetails",
    async () => {
        const response = await getProfileDetailsService()
        return response
    }
)

// export const getNotification = createAsyncThunk(
//     "auth/notificationList",
//     async () => {
//         const response = await getNotificationService()
//         return response?.data
//     }
// )

export const loginFormData = createAsyncThunk(
    "auth/loginDetails",
    async (payload) => {
        const fcmToken = getItemLocalStorage("fcm_token");
        if (payload instanceof FormData) {
            payload.append('fcm_token', fcmToken);
        } else {
            payload = {
                ...payload,
                "fcm_token": fcmToken
            };
        }
        const response = await LoginService(payload)
        return response
    }
)

const LoginSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logoutSuccess: (state) => {
            state.loading = false;
            state.token = "";
            state.profileDetails = {}
            state.notificationList = [];
            state.error = "";
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginFormData.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(loginFormData.fulfilled, (state, action) => {
            state.loading = false;
            state.token = action.payload?.data?.token;
            state.error = "";
        });
        builder.addCase(loginFormData.rejected, (state, action) => {
            state.loading = false;
            state.token = "";
            state.error = action.error.message;
        });
        // ----------------------------------------------------
        builder.addCase(profileDetails.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(profileDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.profileDetails = action.payload?.data;
            state.error = "";
        });
        builder.addCase(profileDetails.rejected, (state, action) => {
            state.loading = false;
            state.profileDetails = "";
            state.error = action.error.message;
        });
        // ----------------------------------------------------
        // builder.addCase(getNotification.pending, (state) => {
        //     state.loading = true;
        // });
        // builder.addCase(getNotification.fulfilled, (state, action) => {
        //     state.loading = false;
        //     state.notificationList = action.payload?.data;
        //     state.error = "";
        // });
        // builder.addCase(getNotification.rejected, (state, action) => {
        //     state.loading = false;
        //     state.notificationList = [];
        //     state.error = action.error.message;
        // });
    },
});

export const { logoutSuccess } = LoginSlice.actions;
export default LoginSlice.reducer;
