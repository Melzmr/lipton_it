import { TRouterStore } from '../TRouterStore';

export const actionCloseModals = (
  state: TRouterStore
): TRouterStore => ({
  ...state,
  activeModal: null,
  modalHistory: [],
});

