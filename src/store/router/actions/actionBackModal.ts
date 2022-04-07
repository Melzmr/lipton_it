import { TRouterStore } from '../TRouterStore';

export const actionBackModal = (
  state: TRouterStore
): TRouterStore => {
  state.modalHistory.pop();

  const lastIndex = state.modalHistory.length - 1;
  let activeModal;

  if (lastIndex < 0) {
    activeModal = null;
  } else {
    activeModal = state.modalHistory[lastIndex];
  }

  state.activeModal = activeModal;

  return state;
};

