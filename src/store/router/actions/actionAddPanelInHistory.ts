import { PanelIds } from 'init/routerEnums';

import { TRouterStore } from '../TRouterStore';

export const actionAddPanelInHistory = (
  state: TRouterStore,
  panelId: PanelIds,
): TRouterStore => {
  state.panelHistory.push(panelId);
  return state;
};
