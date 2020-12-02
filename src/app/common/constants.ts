const { location } = window;

// ie兼容
export const baseHost = location.origin
  ? `${location.protocol}//${location.host}`
  : location.origin;
const apiHost =
  baseHost.indexOf('localhost') !== -1 ? 'http://livebeta.clip.cn' : baseHost;

export const API_BASE = `${apiHost}/api/v2`;
