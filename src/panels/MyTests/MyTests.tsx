import { FC, memo } from 'react';
import { Button, Div, Group, Panel, PanelHeader, Spacing, Tabs, TabsItem } from '@vkontakte/vkui';
import { TPanel } from '../TPanel';
import { useRouterStore } from '../../store';
import { PanelIds } from '../../init/routerEnums';

export const MyTests: FC<TPanel> = memo(({ id }) => {
  const setActivePanel = useRouterStore((state) => state.setActivePanel);
  const closeActivePanel = useRouterStore((state) => state.closeActivePanel);

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
          <Button onClick={() => setActivePanel(PanelIds.CreateTest)} size="m" stretched>
            create question
          </Button>
          <Button onClick={closeActivePanel} size="m" stretched>
            Go back
          </Button>
        </Div>
      </Group>
    </Panel>
  );
});
