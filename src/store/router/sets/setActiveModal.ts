import { TAction } from 'store/TAction';
import { ModalIds } from 'init/routerEnums';

export const ACTIVE_MODAL_SET = 'activeModal/set';

export const setActiveModal: TAction<typeof ACTIVE_MODAL_SET, ModalIds|null> = (activeModal: ModalIds | null) => ({
  type: ACTIVE_MODAL_SET,
  data: activeModal,
});

