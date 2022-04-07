import { TAction } from 'store/TAction';

export const VIEW_BACK = 'view/back';

export const backView: TAction<typeof VIEW_BACK> = () => ({
  type: VIEW_BACK,
});

