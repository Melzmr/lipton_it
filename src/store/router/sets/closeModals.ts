import { TAction } from 'store/TAction';

export const MODALS_CLOSE = 'modals/close';

export const closeModals: TAction<typeof MODALS_CLOSE> = () => ({
  type: MODALS_CLOSE,
});

