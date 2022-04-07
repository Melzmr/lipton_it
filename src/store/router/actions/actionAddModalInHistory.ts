import { ModalIds } from 'init/routerEnums';

import { TRouterStore } from '../TRouterStore';

export const actionAddModalInHistory = (
  state: TRouterStore,
  modalId: ModalIds,
): TRouterStore => {
  state.modalHistory.push(modalId);
  return state;
};
