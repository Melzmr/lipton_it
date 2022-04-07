import { TAction } from 'store/TAction';
import { ViewIds } from 'init/routerEnums';

export const ACTIVE_VIEW_SET = 'activeView/set';

export const setActiveView: TAction<typeof ACTIVE_VIEW_SET, ViewIds> = (activePanel: ViewIds) => ({
  type: ACTIVE_VIEW_SET,
  data: activePanel,
});

