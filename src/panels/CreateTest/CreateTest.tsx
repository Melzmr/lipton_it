import { FC, memo } from 'react';
import { Icon28ChevronLeftOutline } from '@vkontakte/icons';
import { Div, Group, Headline, Panel, PanelHeader, Spacing, Tappable, Text } from '@vkontakte/vkui';
import { TPanel } from '../TPanel';
import { useRouterStore } from '../../store';
import { getCaption, getIcon } from '../../utils';
import { TestCell } from '../../components/TestCell';
import { useCreateTestStore } from '../../store/createTestStore';
import { PanelIds } from '../../init/routerEnums';

export const CreateTest: FC<TPanel> = memo(({ id }) => {
  const closeActivePanel = useRouterStore((state) => state.closeActivePanel);
  const setActivePanel = useRouterStore((state) => state.setActivePanel);
  const updateType = useCreateTestStore((state) => state.updateType);

  return (
    <Panel id={id}>
      <Group separator="hide">
        <PanelHeader
          separator={false}
          left={
            <Tappable
              onClick={closeActivePanel}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0 10px 2px 0',
              }}
            >
              <Icon28ChevronLeftOutline fill="var(--icon_medium)" />
              <Text weight="regular" style={{ color: 'var(--text_secondary)' }}>
                Назад
              </Text>
            </Tappable>
          }
        >
          Новый тест
        </PanelHeader>
        <Spacing style={{ padding: 0 }} separator />
        <Div>
          <Headline weight="regular" style={{ paddingBottom: 22 }}>
            Выберите тип теста
          </Headline>
          <TestCell
            caption="Тест первого впечатления, оценка экранов или изображений на запоминаемость и понятность"
            before={getIcon('five_sec')}
            disabled={false}
            onClick={() => {
              updateType('five_sec');
              setActivePanel(PanelIds.EditQuestion);
            }}
          >
            {getCaption('five_sec')}
          </TestCell>
          <TestCell
            caption="Выбор лучшего варианта страницы, экрана или изображения. Прямое парное сравнение вариантов."
            before={getIcon('side_by_side')}
            disabled={false}
            onClick={() => {
              updateType('side_by_side');
              setActivePanel(PanelIds.EditQuestion);
            }}
          >
            {getCaption('side_by_side')}
          </TestCell>
          <TestCell
            caption="Легко ли пользователю понять, куда кликнуть на экране для выполнения целевого действия."
            before={getIcon('first_click')}
            disabled={false}
            onClick={() => {
              updateType('first_click');
              setActivePanel(PanelIds.EditQuestion);
            }}
          >
            {getCaption('first_click')}
          </TestCell>
        </Div>
      </Group>
    </Panel>
  );
});
