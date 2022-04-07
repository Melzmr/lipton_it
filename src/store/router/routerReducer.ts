import { routerStore } from './routerStore';
import { TRouterStore } from './TRouterStore';
import { TRouterActions } from './TRouterActions';

import { ACTIVE_PANEL_SET } from './sets/setActivePanel';
import { actionSetActivePanel } from './actions/actionSetActivePanel';
import { ACTIVE_MODAL_SET } from './sets/setActiveModal';
import { actionSetActiveModal } from './actions/actionSetActiveModal';
import { PANEL_HISTORY_ADD } from './sets/addPanelInHistory';
import { actionAddPanelInHistory } from './actions/actionAddPanelInHistory';
import { ACTIVE_VIEW_SET } from './sets/setActiveView';
import { actionSetActiveView } from './actions/actionSetActiveView';
import { VIEW_HISTORY_ADD } from './sets/addViewInHistory';
import { actionAddViewInHistory } from './actions/actionAddViewInHistory';
import { MODAL_HISTORY_ADD } from './sets/addModalInHistory';
import { actionAddModalInHistory } from './actions/actionAddModalInHistory';
import { VIEW_BACK } from './sets/backView';
import { actionBackView } from './actions/actionBackView';
import { ROUTER_PARAMS_SET } from './sets/setRouterParams';
import { actionSetRouterParams } from './actions/actionSetRouterParams';
import { MODAL_BACK } from './sets/backModal';
import { actionBackModal } from './actions/actionBackModal';
import { PANEL_BACK } from './sets/backPanel';
import { actionBackPanel } from './actions/actionBackPanel';
import { MODALS_CLOSE } from './sets/closeModals';
import { actionCloseModals } from './actions/actionCloseModals';

export const routerReducer = (
  state = routerStore,
  action: TRouterActions,
): TRouterStore => {
  switch (action.type) {
    case ACTIVE_PANEL_SET:
      return actionSetActivePanel(state, action.data);

    case ACTIVE_MODAL_SET:
      return actionSetActiveModal(state, action.data);

    case ACTIVE_VIEW_SET:
      return actionSetActiveView(state, action.data);

    case PANEL_HISTORY_ADD:
      return actionAddPanelInHistory(state, action.data);

    case MODAL_HISTORY_ADD:
      return actionAddModalInHistory(state, action.data);

    case VIEW_HISTORY_ADD:
      return actionAddViewInHistory(state, action.data);

    case VIEW_BACK:
      return actionBackView(state);

    case MODAL_BACK:
      return actionBackModal(state);

    case PANEL_BACK:
      return actionBackPanel(state);

    case ROUTER_PARAMS_SET:
      return actionSetRouterParams(state, action.data);

    case MODALS_CLOSE:
      return actionCloseModals(state);

    default:
      return state;
  }
};
