import {authAPI} from "api/todolists-api";
import {authActions} from "features/Login/auth-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "app/store";
import {handleServerAppError, handleServerNetworkError} from "utils/error-utils";


const slice = createSlice({
    // важно чтобы не дублировалось, будет в качестве приставки согласно соглашению redux ducks
    name: "app",
    initialState: {
        status: "idle",
        error: '',
        isInitialized: false,
    },
    // состоит из подредьюсеров, каждый из которых эквивалентен одному оператору case в switch, как мы делали раньше (обычный redux)
    reducers: {
        setStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
            state.status = action.payload.status
        },
        setError: (state, action: PayloadAction<{ error: string }>) => {
            state.error = action.payload.error
        },
        setIsInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
            state.isInitialized = action.payload.isInitialized
        },
    },
});


// Создаем reducer с помощью slice
export const appReducer = slice.reducer;

// Action creator также достаем с помощью slice
export const appActions = slice.actions;


export const initializeAppTC = (): AppThunk => (dispatch) => {
    authAPI
        .me()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(authActions.setIsLoggedIn({isLoggedIn: true}));
            } else {
                handleServerAppError(res.data, dispatch);
            }
            dispatch(appActions.setIsInitialized({isInitialized: true}));
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch);
        });
};


export type AppInitialStateType = ReturnType<typeof slice.getInitialState>
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";


/*const initialState: InitialStateType = {
  status: "idle",
  error: null,
  isInitialized: false,
};

export const appReducer = (
  state: InitialStateType = initialState,
  action: ActionsType,
): InitialStateType => {
  switch (action.type) {
    case "APP/SET-STATUS":
      return { ...state, status: action.status };
    case "APP/SET-ERROR":
      return { ...state, error: action.error };
    case "APP/SET-IS-INITIALIZED":
      return { ...state, isInitialized: action.value };
    default:
      return { ...state };
  }
};

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
export type InitialStateType = {
  // происходит ли сейчас взаимодействие с сервером
  status: RequestStatusType;
  // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
  error: string | null;
  // true когда приложение проинициализировалось (проверили юзера, настройки получили и т.д.)
  isInitialized: boolean;
};

export const setAppErrorAC = (error: string | null) =>
  ({ type: "APP/SET-ERROR", error }) as const;
export const setAppStatusAC = (status: RequestStatusType) =>
  ({ type: "APP/SET-STATUS", status }) as const;
export const setAppInitializedAC = (value: boolean) =>
  ({ type: "APP/SET-IS-INITIALIZED", value }) as const;

export const initializeAppTC = () => (dispatch: Dispatch) => {
  authAPI.me().then((res) => {
    if (res.data.resultCode === 0) {
      dispatch(authActions.setIsLoggedIn({isLoggedIn:true}));
    } else {
    }

    dispatch(setAppInitializedAC(true));
  });
};

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>;
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>;

type ActionsType =
  | SetAppErrorActionType
  | SetAppStatusActionType
  | ReturnType<typeof setAppInitializedAC>;*/

