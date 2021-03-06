import { FC } from 'react';
import { View } from '@vkontakte/vkui';
import { PanelIds } from 'init/routerEnums';
import { RootModal } from './modals/RootModal';
import { Home } from './panels/Home/Home';
import { useRouterStore } from './store';
import { Test } from './panels/Test/Test';
import { Success } from './panels/Success/Success';
import { MyTests } from './panels/MyTests/MyTests';
import { Statistic } from './panels/Statistic/Statistic';
import { CreateQuestion } from './panels/CreateQuestion/CreateQuestion';
import { CreateTest } from './panels/CreateTest/CreateTest';
import { EditQuestion } from './panels/EditQuestion/EditQuestion';

export const App: FC = () => {
  const activePanel = useRouterStore((state) => state.activePanel);
  const activeModal = useRouterStore((state) => state.activeModal);
  const panelsHistory = useRouterStore((state) => state.panelHistory);
  const closePanel = useRouterStore((state) => state.closeActivePanel);

  const onSwipeBack = () => {
    if (activeModal) {
      return;
    }

    closePanel();
  };

  return (
    <View onSwipeBack={onSwipeBack} history={panelsHistory} modal={<RootModal />} activePanel={activePanel}>
      <Home id={PanelIds.Home} />
      <Test id={PanelIds.Test} />
      <Success id={PanelIds.Success} />
      <MyTests id={PanelIds.MyTests} />
      <Statistic id={PanelIds.Statistic} />
      <CreateQuestion id={PanelIds.CreateQuestion} />
      <CreateTest id={PanelIds.CreateTest} />
      <EditQuestion id={PanelIds.EditQuestion} />
    </View>
  );
};
