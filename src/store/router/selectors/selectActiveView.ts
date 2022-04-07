import { TStore } from '../../TStore';
import { ViewIds } from '../../../init/routerEnums';

export const selectActiveView = (state: TStore): ViewIds => state.router.activeView;
