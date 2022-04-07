import { TAction } from 'store/TAction';
import { PanelIds } from 'init/routerEnums';

export const ACTIVE_PANEL_SET = 'activePanel/set';

export const setActivePanel: TAction<typeof ACTIVE_PANEL_SET, PanelIds> = (activePanel: PanelIds) => ({
  type: ACTIVE_PANEL_SET,
  data: activePanel,
});

