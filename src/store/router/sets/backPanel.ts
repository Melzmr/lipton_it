import { TAction } from 'store/TAction';

export const PANEL_BACK = 'panel/back';

export const backPanel: TAction<typeof PANEL_BACK> = () => ({
  type: PANEL_BACK,
});
