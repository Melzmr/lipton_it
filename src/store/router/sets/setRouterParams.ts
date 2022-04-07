import { TAction } from 'store/TAction';

export const ROUTER_PARAMS_SET = 'routerParams/set';

export const setRouterParams: TAction<typeof ROUTER_PARAMS_SET, Record<string, string>> = (params: Record<string, string>) => ({
  type: ROUTER_PARAMS_SET,
  data: params,
});

