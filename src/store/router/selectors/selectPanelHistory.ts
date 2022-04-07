import { TStore } from '../../TStore';
import { PanelIds } from '../../../init/routerEnums';

export const selectPanelHistory = (state: TStore): PanelIds[] => state.router.panelHistory;
