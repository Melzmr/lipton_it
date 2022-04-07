import { ModalIds } from 'init/routerEnums';
import { TAction } from 'store/TAction';

export const MODAL_HISTORY_ADD = 'modalHistory/add';

export const addModalInHistory: TAction<typeof MODAL_HISTORY_ADD, ModalIds> = (modalId: ModalIds) => ({
  type: MODAL_HISTORY_ADD,
  data: modalId,
});
