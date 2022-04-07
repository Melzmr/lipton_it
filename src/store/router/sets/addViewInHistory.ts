import { ViewIds } from 'init/routerEnums';
import { TAction } from 'store/TAction';

export const VIEW_HISTORY_ADD = 'viewHistory/add';

export const addViewInHistory: TAction<typeof VIEW_HISTORY_ADD, ViewIds> = (viewId: ViewIds) => ({
  type: VIEW_HISTORY_ADD,
  data: viewId,
});

