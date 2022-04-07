import { FC, memo, useRef } from 'react';
import { Icon56CheckCircleOutline } from '@vkontakte/icons';
import { Button, Group, Panel, PanelHeader, Placeholder, Spacing } from '@vkontakte/vkui';
import { TPanel } from '../TPanel';
import { useRouterStore } from '../../store';
import { PanelIds } from '../../init/routerEnums';

export const Success: FC<TPanel> = memo(({ id }) => {
  const setActivePanel = useRouterStore((state) => state.setActivePanel);
  const panelParams = useRef(useRouterStore((state) => state.panelParams[state.panelParams.length - 1]));

  return (
    <Panel id={id}>
      <Group separator="hide">
        <PanelHeader separator={false}>Исследования</PanelHeader>
        <Spacing style={{ padding: 0 }} separator />
        <Placeholder
          icon={<Icon56CheckCircleOutline fill="var(--dynamic_green)" />}
          header="Спасибо, тест завершен"
          action={<Button onClick={() => setActivePanel(PanelIds.Home)}>Закрыть</Button>}
        >
          {panelParams.current?.testName}
        </Placeholder>
      </Group>
    </Panel>
  );
});
