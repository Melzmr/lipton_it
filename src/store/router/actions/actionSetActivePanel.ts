import { PanelIds } from 'init/routerEnums';

import { TRouterStore } from '../TRouterStore';

export const actionSetActivePanel = (
  state: TRouterStore,
  activePanel: PanelIds,
): TRouterStore => ({
  ...state,
  activePanel,
});

