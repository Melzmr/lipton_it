import { FC, memo, useEffect, useRef, useState } from 'react';
import { Div, Group, Panel, PanelHeader, PanelSpinner, Placeholder, Spacing, Tappable, Text } from '@vkontakte/vkui';
import { Icon28ChevronLeftOutline } from '@vkontakte/icons';
import { TPanel } from '../TPanel';
import { useRouterStore } from '../../store';
import { TTestData } from '../../store/testsMocks';
import { TestContent } from './TestContent';
import { getCaption } from '../../utils';
import { fetchData } from '../../api/Api';

export const Test: FC<TPanel> = memo(({ id }) => {
  const closeActivePanel = useRouterStore((state) => state.closeActivePanel);
  const panelParams = useRef(useRouterStore((state) => state.panelParams[state.panelParams.length - 1]));
  const [testData, setTestData] = useState<TTestData>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { id } = panelParams.current as { id: string };
        const test = await fetchData(`/test/${id}`);
        setTestData(test);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

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
          {testData?.testType && getCaption(testData.testType)}
        </PanelHeader>
        <Spacing style={{ padding: 0 }} separator />
        {error && <Placeholder>Ошибка, такого теста не существует</Placeholder>}
        {loading && <PanelSpinner />}
        {!error && !loading && testData && (
          <Div>
            <TestContent {...testData} />
          </Div>
        )}
      </Group>
    </Panel>
  );
});
