import { addModalInHistory } from './sets/addModalInHistory';
import { addPanelInHistory } from './sets/addPanelInHistory';
import { addViewInHistory } from './sets/addViewInHistory';
import { backModal } from './sets/backModal';
import { backPanel } from './sets/backPanel';
import { backView } from './sets/backView';
import { closeModals } from './sets/closeModals';
import { setActiveModal } from './sets/setActiveModal';
import { setActivePanel } from './sets/setActivePanel';
import { setActiveView } from './sets/setActiveView';
import { setRouterParams } from './sets/setRouterParams';

export type TRouterActions = ReturnType<
| typeof addModalInHistory
| typeof addPanelInHistory
| typeof addViewInHistory
| typeof backModal
| typeof backPanel
| typeof backView
| typeof closeModals
| typeof setActiveModal
| typeof setActivePanel
| typeof setActiveView
| typeof setRouterParams
>;
