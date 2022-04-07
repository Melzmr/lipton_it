import { ModalIds, PanelIds, ViewIds } from 'init/routerEnums';
import create, { GetState, SetState } from 'zustand'

export const actionBackModal = (set: SetState<RouterStore>, get: GetState<RouterStore>) => {
	let currentModalHistory = get().modalHistory;
	currentModalHistory = currentModalHistory.slice(0, currentModalHistory.length - 1);
	set(() => ({ modalHistory: currentModalHistory }))


	const lastIndex = currentModalHistory.length - 1;
	let activeModal;

	if (lastIndex < 0) {
		activeModal = null;
	} else {
		activeModal = currentModalHistory[lastIndex];
	}

	set({activeModal})
}

export const actionBackView = (set: SetState<RouterStore>, get: GetState<RouterStore>) => {
	let currentViewHistory = get().viewHistory;
	currentViewHistory = currentViewHistory.slice(0, currentViewHistory.length - 1);
	set(() => ({
		viewHistory: currentViewHistory,
		activeView: currentViewHistory[currentViewHistory.length - 1]
	}))
}

export const actionBackPanel = (set: SetState<RouterStore>, get: GetState<RouterStore>) => {
	let currentPanelHistory = get().panelHistory;
	currentPanelHistory = currentPanelHistory.slice(0, currentPanelHistory.length - 1)
	set(() => ({ panelHistory: currentPanelHistory }))

	const lastIndex = currentPanelHistory.length - 1;
	let activePanel;

	if (lastIndex < 0) {
		activePanel = null;
	} else {
		activePanel = currentPanelHistory[lastIndex];
	}

	if (activePanel) {
		set({ activePanel })
	}
}

type RouterStore = {
	panelHistory: PanelIds[];
	activePanel: PanelIds;
	setActivePanel(activePanel: PanelIds): void;
	closeActivePanel(): void;

	modalHistory: ModalIds[];
	activeModal: ModalIds | null;
	setActiveModal(activeModal: ModalIds): void;
	closeActiveModal(): void;

	activeView: ViewIds;
	viewHistory: ViewIds[];
	setActiveView(activeView: ViewIds): void;
	closeActiveView(): void;
};

export const useRouterStore = create<RouterStore>((set, get) => ({
	panelHistory: [PanelIds.Home],
	activePanel: PanelIds.Home,
	setActivePanel: (activePanel) => set((state) => ({
				activePanel,
				panelHistory: [...state.panelHistory, activePanel]
	})),
	closeActivePanel: () => actionBackPanel(set, get),

	modalHistory: [],
	activeModal: null,
	setActiveModal: (activeModal) => set((state) => ({
		activeModal,
		modalHistory: [...state.modalHistory, activeModal],
	})),
	closeActiveModal: () => actionBackModal(set, get),

	viewHistory: [ViewIds.BaseFlow],
	activeView: ViewIds.BaseFlow,
	setActiveView: (activeView) => set((state) => ({
		activeView,
		viewHistory: [...state.viewHistory, activeView],
	})),
	closeActiveView: () => actionBackView(set, get),
}))