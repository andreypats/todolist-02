import {
    appActions,
} from "app/app-reducer";
import {authAPI, LoginParamsType} from "api/todolists-api";
import {
    handleServerAppError,
    handleServerNetworkError,
} from "utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "app/store";

// slice - редьюсеры создаем с помощью функции createSlice
const slice = createSlice({
    // важно чтобы не дублировалось, будет в качестве приставки согласно соглашению redux ducks
    name: "auth",
    initialState: {
        isLoggedIn: false,
    },
    // состоит из подредьюсеров, каждый из которых эквивалентен одному оператору case в switch, как мы делали раньше (обычный redux)
    reducers: {
        // Объект payload. Типизация через PayloadAction
        setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
            // Логику в подредьюсерах пишем мутабельным образом,
            // т.к. иммутабельность достигается благодаря immer.js
            state.isLoggedIn = action.payload.isLoggedIn;
        },
    },
});


// Создаем reducer с помощью slice
export const authReducer = slice.reducer;


// Action creator также достаем с помощью slice
export const authActions = slice.actions;


// thunks
export const loginTC =
    (data: LoginParamsType): AppThunk => (dispatch) => {
        dispatch(appActions.setStatus({status: "loading"}));
        authAPI
            .login(data)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(authActions.setIsLoggedIn({isLoggedIn: true}));
                    dispatch(appActions.setStatus({status: "succeeded"}));
                } else {
                    handleServerAppError(res.data, dispatch);
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch);
            });
    };
export const logoutTC =
    (): AppThunk => (dispatch) => {
        dispatch(appActions.setStatus({status: "loading"}));
        authAPI
            .logout()
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(authActions.setIsLoggedIn({isLoggedIn: false}));
                    dispatch(appActions.setStatus({status: "succeeded"}));
                } else {
                    handleServerAppError(res.data, dispatch);
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch);
            });
    };


/*
const initialState: InitialStateType = {
  isLoggedIn: false,
};

export const authReducer = (
  state: InitialStateType = initialState,
  action: ActionsType,
): InitialStateType => {
  switch (action.type) {
    case "login/SET-IS-LOGGED-IN":
      return { ...state, isLoggedIn: action.value };
    default:
      return state;
  }
};

// actions
export const setIsLoggedInAC = (value: boolean) =>
  ({ type: "login/SET-IS-LOGGED-IN", value }) as const;
 */

/*
// types
type ActionsType = ReturnType<typeof setIsLoggedInAC>;
type InitialStateType = {
  isLoggedIn: boolean;
};

type ThunkDispatch = Dispatch<
  ActionsType | SetAppStatusActionType | SetAppErrorActionType
>;
*/
