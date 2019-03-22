import { AuthActionType, AuthActions } from './auth.actions';

export interface AuthState {
  authenticated: boolean;
  error: string;
  claims: any;
}

const initialState: AuthState = {
  authenticated: false,
  error: null,
  claims: null
};

export function authReducer(state = initialState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionType.Login:
    case AuthActionType.Logout:
      return initialState;

    case AuthActionType.LoginSuccess:
      return {
        ...state,
        authenticated: true,
        claims: action.payload.claims
      };

    case AuthActionType.LoginFailure:
      return {
        ...state,
        error: 'An error has occurred during login'
      };

    default:
      return state;
  }
}

export const getAuthenticated = (state: AuthState) => state.authenticated;
export const getError = (state: AuthState) => state.error;
export const getClaims = (state: AuthState) => state.claims;