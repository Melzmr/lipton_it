import { FC, memo } from 'react';

import router from 'init/router';
import { ModalIds } from 'init/routerEnums';

import { Button, Div, Panel, PanelHeader } from '@vkontakte/vkui';
import { TPanel } from '../TPanel';

export const Home: FC<TPanel> = memo(({ id }) => (
  <Panel id={id}>
    <PanelHeader>home</PanelHeader>
    <Div>
      <Button onClick={() => router.openModal(ModalIds.TestModal)} size="m" stretched>Open modal</Button>
    </Div>
  </Panel>
));
