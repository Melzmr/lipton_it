import { FC } from 'react';
import { useSelector } from 'react-redux';

import { View } from '@vkontakte/vkui';

import { selectActivePanel } from 'store/router/selectors/selectActivePanel';
import { selectPanelHistory } from 'store/router/selectors/selectPanelHistory';
import { selectActiveModal } from 'store/router/selectors/selectActiveModal';

import router from 'init/router';
import { PanelIds } from 'init/routerEnums';

import { RootModal } from './modals/RootModal';
import { Home } from './panels/Home/Home';

export const App: FC = () => {
  const activePanel = useSelector(selectActivePanel);
  const activeModal = useSelector(selectActiveModal);
  const panelsHistory = useSelector(selectPanelHistory);

  const onSwipeBack = () => {
    if (activeModal) {
      return;
    }

    router.closePanel();
  };

  return (
    <View onSwipeBack={onSwipeBack} history={panelsHistory} modal={<RootModal />} activePanel={activePanel}>
      <Home id={PanelIds.Home} />
    </View>
  );
};

