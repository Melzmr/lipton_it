import { FC, memo } from 'react';

import { ModalIds, PanelIds } from 'init/routerEnums';

import { Button, Div, Panel, PanelHeader } from '@vkontakte/vkui';
import { TPanel } from '../TPanel';
import { useRouterStore } from '../../store';

export const Home: FC<TPanel> = memo(({ id }) => {
  const setActiveModal = useRouterStore((state) => state.setActiveModal);
  const setActivePanel = useRouterStore((state) => state.setActivePanel);

  return (
      <Panel id={id}>
        <PanelHeader>home</PanelHeader>
        <Div>
          <Button onClick={() => setActiveModal(ModalIds.TestModal)} size="m" stretched>Open modal</Button>
          <Button onClick={() => setActivePanel(PanelIds.Test, { id: 5 })} size="m" stretched>Open Test</Button>
        </Div>
      </Panel>
  )
});
