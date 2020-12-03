import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';

import { LoadingIndicator } from '../components/LoadingIndicator';

const locationHelper = locationHelperBuilder({});

// 是否登录 获取权限判断
const userIsAuthenticatedDefaults = {
  authenticatedSelector: state => state.app.userLogined,
  authenticatingSelector: state => state.app.userLogined,
  wrapperDisplayName: 'UserIsAuthenticated',
};

export const userIsAuthenticated = connectedAuthWrapper({
  ...userIsAuthenticatedDefaults,
  AuthenticatingComponent: LoadingIndicator,
});

// 登录后才能打开，否则重新向到 '/'
export const userIsAuthenticatedRedir = connectedRouterRedirect({
  ...userIsAuthenticatedDefaults,
  AuthenticatingComponent: LoadingIndicator,
  redirectPath: state => '/',
});

// 未登录才能打开，否则重新向到 '/'
const userIsNotAuthenticatedDefaults = {
  // Want to redirect the user when they are done loading and authenticated
  authenticatedSelector: state => !state.app.userLogined,
  wrapperDisplayName: 'UserIsNotAuthenticated',
};

export const userIsNotAuthenticatedRedir = connectedRouterRedirect({
  ...userIsNotAuthenticatedDefaults,
  redirectPath: (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || '/',
  allowRedirectBack: false,
});
