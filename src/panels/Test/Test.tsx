import { FC, memo, useRef } from 'react';
import { TPanel } from '../TPanel';
import { Button, Div, Panel, PanelHeader } from '@vkontakte/vkui';
import { useRouterStore } from '../../store';
import { PanelIds } from '../../init/routerEnums';

export const Test: FC<TPanel>  = memo(({ id }) => {
  const closeActivePanel = useRouterStore((state) => state.closeActivePanel);
  const setActivePanel = useRouterStore((state) => state.setActivePanel);
  const panelParams = useRef(useRouterStore((state) => state.panelParams[state.panelParams.length - 1]));
  console.log(panelParams.current);

  return (
      <Panel id={id}>
        <PanelHeader>Test</PanelHeader>
        <Div>
          <Button onClick={() => setActivePanel(PanelIds.Success, { prop: 'success' })} size="m" stretched>Open Success</Button>
          <Button onClick={() => setActivePanel(PanelIds.MyTests, { prop: 'myTests' })} size="m" stretched>Open MyTests</Button>
          <Button onClick={closeActivePanel} size="m" stretched>Go back</Button>
        </Div>
      </Panel>
  )
})