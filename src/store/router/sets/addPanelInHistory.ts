import { PanelIds } from 'init/routerEnums';
import { TAction } from 'store/TAction';

export const PANEL_HISTORY_ADD = 'panelHistory/add';

export const addPanelInHistory: TAction<typeof PANEL_HISTORY_ADD, PanelIds> = (panelId: PanelIds) => ({
  type: PANEL_HISTORY_ADD,
  data: panelId,
});

