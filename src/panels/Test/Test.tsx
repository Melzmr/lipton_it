import { FC, memo, useEffect, useRef, useState } from 'react';
import {
  Button,
  Div,
  Group,
  Panel,
  PanelHeader,
  PanelSpinner,
  Placeholder,
  Spacing,
  Tappable,
  Text,
} from '@vkontakte/vkui';
import { Icon28ChevronLeftOutline, Icon56ComputerOutline, Icon56SmartphoneOutline } from '@vkontakte/icons';
import { TPanel } from '../TPanel';
import { useRouterStore } from '../../store';
import { TTestData } from '../../store/testsMocks';
import { TestContent } from './TestContent';
import { fetchData, vkPlatform } from '../../api/Api';

export const Test: FC<TPanel> = memo(({ id }) => {
  const closeActivePanel = useRouterStore((state) => state.closeActivePanel);
  const panelParams = useRef(useRouterStore((state) => state.panelParams[state.panelParams.length - 1]));
  const [testData, setTestData] = useState<TTestData>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isWrongPlatform, setIsWrongPlatform] = useState(false);
  const isDesktop = vkPlatform === 'desktop';

  useEffect(() => {
    (async () => {
      try {
        const { id } = panelParams.current as { id: string };
        const test = await fetchData(`/test/${id}?user_platform=${vkPlatform}`);
        if (test.completed) {
          closeActivePanel();

          return;
        }
        setTestData(test);
      } catch (e) {
        if (e.message === 'invalid_platform') {
          setIsWrongPlatform(true);
        }
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [closeActivePanel]);

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
          {testData?.title}
        </PanelHeader>
        <Spacing style={{ padding: 0 }} separator />
        {error &&
          (isWrongPlatform ? (
            <Placeholder
              icon={isDesktop ? <Icon56SmartphoneOutline /> : <Icon56ComputerOutline />}
              action={<Button onClick={closeActivePanel}>Закрыть</Button>}
              header={`Тест доступен только для ${isDesktop ? 'смартфонов' : 'компьютера'}`}
            >
              Откройте его с&nbsp;{isDesktop ? 'мобильного телефона' : 'компьютера'}, чтобы начать проходить
            </Placeholder>
          ) : (
            <Placeholder>Ошибка, такого теста не существует</Placeholder>
          ))}
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
