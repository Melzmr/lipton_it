import { ModalIds, PanelIds, ViewIds } from 'init/routerEnums';

export type TRouterStore = {
  activePanel: PanelIds;
  panelHistory: PanelIds[];
  activeView: ViewIds;
  viewHistory: ViewIds[];
  activeModal: ModalIds | null;
  modalHistory: ModalIds[];
  routerParams: Record<string, string|number>;
};

