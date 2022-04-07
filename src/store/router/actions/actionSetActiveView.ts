import { ViewIds } from 'init/routerEnums';

import { TRouterStore } from '../TRouterStore';

export const actionSetActiveView = (
  state: TRouterStore,
  activeView: ViewIds,
): TRouterStore => ({
  ...state,
  activeView,
});

