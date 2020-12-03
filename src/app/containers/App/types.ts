/* --- STATE --- */
export interface UserInfoState {
  id: string;
  name: string;
}

export interface AppState {
  userFetching: boolean;
  userLogined: boolean;
  userInfo: UserInfoState;
}

export type ContainerState = AppState;
