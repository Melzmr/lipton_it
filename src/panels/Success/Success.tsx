import { FC, memo, useRef } from 'react';
import { TPanel } from '../TPanel';
import { Button, Div, Panel, PanelHeader } from '@vkontakte/vkui';
import { useRouterStore } from '../../store';

export const Success: FC<TPanel>  = memo(({ id }) => {
  const closeActivePanel = useRouterStore((state) => state.closeActivePanel);
  const panelParams = useRef(useRouterStore((state) => state.panelParams[state.panelParams.length - 1]));
  console.log(panelParams.current);

  return (
      <Panel id={id}>
        <PanelHeader>Success</PanelHeader>
        <Div>
          <Button onClick={closeActivePanel} size="m" stretched>Go back</Button>
        </Div>
      </Panel>
  )
})