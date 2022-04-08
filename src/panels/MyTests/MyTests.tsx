import { FC, memo, useRef } from 'react';
import { Button, Div, Group, Panel, PanelHeader, Spacing, Tabs, TabsItem } from '@vkontakte/vkui';
import { TPanel } from '../TPanel';
import { useRouterStore } from '../../store';
import { PanelIds } from '../../init/routerEnums';

export const MyTests: FC<TPanel> = memo(({ id }) => {
  const setActivePanel = useRouterStore((state) => state.setActivePanel);
  const panelParams = useRef(useRouterStore((state) => state.panelParams[state.panelParams.length - 1]));
  console.log(panelParams.current);

  return (
    <Panel id={id}>
      <Group separator="hide">
        <PanelHeader separator={false}>Исследования</PanelHeader>
        <Spacing style={{ padding: 0 }} separator />
        <Div style={{ paddingTop: 0, paddingBottom: 0 }}>
          <Tabs>
            <TabsItem onClick={() => setActivePanel(PanelIds.Home)} selected={false}>
              Главная
            </TabsItem>
            <TabsItem selected>Мои исследования</TabsItem>
          </Tabs>
        </Div>
        <Spacing separator />
        <Div>
          <Button
            onClick={() => {
              setActivePanel(PanelIds.Statistic, { testId: '624f548a8e8b3b77b19500aa' });
            }}
            size="m"
            stretched
          >
            test
          </Button>
        </Div>
      </Group>
    </Panel>
  );
});
