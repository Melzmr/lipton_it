import { TRouterStore } from '../TRouterStore';

export const actionBackView = (
  state: TRouterStore
): TRouterStore => {
  state.viewHistory.pop();
  state.activeView = state.viewHistory[state.viewHistory.length - 1];

  return state;
};
