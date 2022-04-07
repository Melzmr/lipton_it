import { store } from 'store/store';
import { setActivePanel } from 'store/router/sets/setActivePanel';
import { addPanelInHistory } from 'store/router/sets/addPanelInHistory';
import { setActiveModal } from 'store/router/sets/setActiveModal';
import { addModalInHistory } from 'store/router/sets/addModalInHistory';
import { setRouterParams } from 'store/router/sets/setRouterParams';
import { setActiveView } from 'store/router/sets/setActiveView';
import { addViewInHistory } from 'store/router/sets/addViewInHistory';
import { backView } from 'store/router/sets/backView';
import { backModal } from 'store/router/sets/backModal';
import { backPanel } from 'store/router/sets/backPanel';
import { closeModals } from 'store/router/sets/closeModals';

import { ModalIds, PanelIds, ViewIds } from './routerEnums';

export const locationParams = new URLSearchParams(window.location.search);

const { dispatch } = store;

const ACTION_VIEW = 'view';
const ACTION_PANEL = 'panel';
const ACTION_MODAL = 'modal';

type TActions =
  | typeof ACTION_VIEW
  | typeof ACTION_PANEL
  | typeof ACTION_MODAL;

class Navigator {
  closePanel() {
    Navigator.closeAction(ACTION_PANEL);
  }

  closeModal() {
    Navigator.closeAction(ACTION_MODAL);
  }

  closeView() {
    Navigator.closeAction(ACTION_VIEW);
  }

  closeFromBrowserHistory() {
    const { viewHistory, modalHistory } = store.getState().router;

    if (modalHistory.length > 0) {
      Navigator.closeAction(ACTION_MODAL);
      return;
    }

    if (viewHistory.length > 1) {
      Navigator.closeAction(ACTION_VIEW);
      return;
    }

    Navigator.closeAction(ACTION_PANEL);
  }

  closeAllModals() {
    dispatch(closeModals());
  }

  openPanel(panelId: PanelIds, addInHistory = true, urlParams = {}) {
    Navigator.openAction(ACTION_PANEL, panelId, addInHistory, urlParams);
  }

  openModal(modalId: ModalIds, addInHistory = true, urlParams = {}) {
    Navigator.openAction(ACTION_MODAL, modalId, addInHistory, urlParams);
  }

  openView(viewId: ViewIds, addInHistory = true, urlParams = {}) {
    Navigator.openAction(ACTION_VIEW, viewId, addInHistory, urlParams);
  }

  clearRouterParams() {
    dispatch(setRouterParams({}));
  }

  private static openAction(action: TActions, actionId: PanelIds|ViewIds|ModalIds, addInHistory: boolean, urlParams: Record<string, string>): void {
    dispatch(setRouterParams({}));

    let setAction;
    let addHistory;
    switch (action) {
      case ACTION_VIEW:
        setAction = setActiveView;
        addHistory = addViewInHistory;
        break;

      case ACTION_MODAL:
        setAction = setActiveModal;
        addHistory = addModalInHistory;
        break;

      case ACTION_PANEL:
        setAction = setActivePanel;
        addHistory = addPanelInHistory;
        break;
    }

    dispatch(setAction(actionId as never));

    if (addInHistory) {
      window.history.pushState({ actionId }, actionId);
      dispatch(addHistory(actionId as never));
    }

    if (Object.keys(urlParams).length > 0) {
      dispatch(setRouterParams(urlParams));
    }
  }

  private static closeAction(action: TActions) {
    // dispatch(setRouterParams({}));

    let setAction;
    switch (action) {
      case ACTION_VIEW:
        setAction = backView;
        break;

      case ACTION_MODAL:
        setAction = backModal;
        break;

      case ACTION_PANEL:
        setAction = backPanel;
        break;
    }

    dispatch(setAction());
  }
}

const router = new Navigator();
export default router;
