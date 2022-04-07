import { TStore } from '../../TStore';
import { ModalIds } from '../../../init/routerEnums';

export const selectActiveModal = (state: TStore): ModalIds|null => state.router.activeModal;
