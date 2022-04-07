import { TAction } from 'store/TAction';

export const MODAL_BACK = 'modal/back';

export const backModal: TAction<typeof MODAL_BACK> = () => ({
  type: MODAL_BACK,
});
