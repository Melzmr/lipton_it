import { ModalIds } from 'init/routerEnums';

import { TRouterStore } from '../TRouterStore';

export const actionSetActiveModal = (
  state: TRouterStore,
  activeModal: ModalIds|null,
): TRouterStore => ({
  ...state,
  activeModal,
});

