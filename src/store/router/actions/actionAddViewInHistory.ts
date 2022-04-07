import { ViewIds } from 'init/routerEnums';

import { TRouterStore } from '../TRouterStore';

export const actionAddViewInHistory = (
  state: TRouterStore,
  viewId: ViewIds,
): TRouterStore => {
  state.viewHistory.push(viewId);
  return state;
};
