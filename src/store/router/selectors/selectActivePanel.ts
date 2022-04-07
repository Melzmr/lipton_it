import { TStore } from '../../TStore';
import { PanelIds } from '../../../init/routerEnums';

export const selectActivePanel = (state: TStore): PanelIds => state.router.activePanel;
