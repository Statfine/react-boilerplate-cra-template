/**
 *
 * Asynchronously loads the component for UacSucPage
 *
 */

import { lazyLoad } from 'utils/loadable';

export const UacSucPage = lazyLoad(
  () => import('./index'),
  module => module.UacSucPage,
);
