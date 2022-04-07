import { TRouterStore } from '../TRouterStore';

export const actionBackPanel = (
  state: TRouterStore
): TRouterStore => {
  state.panelHistory.pop();

  const lastIndex = state.panelHistory.length - 1;
  let activePanel;

  if (lastIndex < 0) {
    activePanel = null;
  } else {
    activePanel = state.panelHistory[lastIndex];
  }

  if (!activePanel) {
    return state;
  }

  state.activePanel = activePanel;

  return state;
};

