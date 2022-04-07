import { TRouterStore } from '../TRouterStore';

export const actionSetRouterParams = (
  state: TRouterStore,
  routerParams: Record<string, string|number>
): TRouterStore => ({
  ...state,
  routerParams,
});

