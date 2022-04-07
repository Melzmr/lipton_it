import { FC } from 'react';

import { View } from '@vkontakte/vkui';

import { PanelIds } from 'init/routerEnums';

import { RootModal } from './modals/RootModal';
import { Home } from './panels/Home/Home';
import { useRouterStore } from './store';

export const App: FC = () => {
  const activePanel = useRouterStore((state) => state.activePanel)
  const activeModal = useRouterStore((state) => state.activeModal)
  const panelsHistory = useRouterStore((state) => state.panelHistory)
  const closePanel = useRouterStore((state) => state.closeActivePanel)

  const onSwipeBack = () => {
    if (activeModal) {
      return;
    }

    closePanel();
  };

  return (
    <View onSwipeBack={onSwipeBack} history={panelsHistory} modal={<RootModal />} activePanel={activePanel}>
      <Home id={PanelIds.Home} />
    </View>
  );
};

