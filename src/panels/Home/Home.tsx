import React, { memo, useEffect, useState } from 'react';
import { Icon56ComputerOutline, Icon56FragmentsOutline, Icon56RecentOutline } from '@vkontakte/icons';
import { PanelIds } from 'init/routerEnums';
import {
  Button,
  Div,
  Group,
  Headline,
  Panel,
  PanelHeader,
  PanelSpinner,
  Placeholder,
  Spacing,
  Tabs,
  TabsItem,
} from '@vkontakte/vkui';
import { TPanel } from '../TPanel';
import { useRouterStore } from '../../store';
import { TestCell } from '../../components/TestCell';
import { mocks, TestStatus, TestType, TTest } from '../../store/testsMocks';
import { getCaption } from '../../utils';

const getAfterText = (status: TestStatus): string => {
  switch (status) {
    case 'available':
      return 'Доступен';

    case 'completed':
      return 'Пройден';

    case 'unavailable':
      return 'Не пройден';
  }
};

const getIcon = (type: TestType): JSX.Element => {
  switch (type) {
    case 'five_sec':
      return (
        <Icon56RecentOutline
          height={48}
          width={48}
          fill="var(--dynamic_red)"
          style={{ marginRight: 12, marginTop: 8, marginBottom: 8 }}
        />
      );

    case 'first_click':
      return (
        <Icon56ComputerOutline
          height={48}
          width={48}
          fill="var(--dynamic_green)"
          style={{ marginRight: 12, marginTop: 8, marginBottom: 8 }}
        />
      );

    case 'side_by_side':
      return (
        <Icon56FragmentsOutline
          height={48}
          width={48}
          fill="var(--dynamic_orange)"
          style={{ marginRight: 12, marginTop: 8, marginBottom: 8 }}
        />
      );
  }
};

export const Home: React.FC<TPanel> = memo(({ id }) => {
  // const setActiveModal = useRouterStore((state) => state.setActiveModal);
  const setActivePanel = useRouterStore((state) => state.setActivePanel);
  const [availableTests, setAvailableTests] = useState<TTest[]>([]);
  const [unavailableTests, setUnavailableTests] = useState<TTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      try {
        const avTests: TTest[] = [];
        const unavTests: TTest[] = [];

        mocks.forEach((test) => {
          if (test.status === 'available') {
            avTests.push(test);
          } else {
            unavTests.push(test);
          }
        });

        setAvailableTests(avTests);
        setUnavailableTests(unavTests);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }, 300);
  }, []);

  return (
    <Panel id={id}>
      <Group separator="hide">
        <PanelHeader separator={false}>Исследования</PanelHeader>
        <Spacing style={{ padding: 0 }} separator />
        <Div style={{ paddingTop: 0, paddingBottom: 0 }}>
          <Tabs>
            <TabsItem selected>Главная</TabsItem>
            <TabsItem onClick={() => setActivePanel(PanelIds.MyTests)} selected={false}>
              Мои исследования
            </TabsItem>
          </Tabs>
        </Div>
        <Spacing separator />

        <Div>
          {error && <Placeholder>Ошибка</Placeholder>}
          {loading && <PanelSpinner />}
          {!error && !loading && (
            <>
              {!!availableTests.length && (
                <>
                  <Headline weight="regular" style={{ paddingBottom: 24 }}>
                    Доступные исследования
                  </Headline>
                  {availableTests.map(({ id, testType, title, status }) => (
                    <TestCell
                      key={id}
                      caption={getCaption(testType)}
                      before={getIcon(testType)}
                      after={getAfterText(status)}
                      actions={
                        <Button mode="secondary" onClick={() => setActivePanel(PanelIds.Test, { id })}>
                          Пройти
                        </Button>
                      }
                    >
                      {title}
                    </TestCell>
                  ))}
                </>
              )}
              {!!unavailableTests.length && (
                <>
                  <Headline
                    weight="regular"
                    style={{
                      paddingBottom: 24,
                      ...(!!availableTests.length && { paddingTop: 36 }),
                    }}
                  >
                    История исследований
                  </Headline>
                  {unavailableTests.map(({ id, testType, title, status }) => (
                    <TestCell
                      key={id}
                      caption={getCaption(testType)}
                      before={getIcon(testType)}
                      after={getAfterText(status)}
                      style={{ opacity: 0.4 }}
                    >
                      {title}
                    </TestCell>
                  ))}
                </>
              )}
            </>
          )}
          {/*  <Button onClick={() => setActiveModal(ModalIds.TestModal)} size="m" stretched>Open modal</Button> */}
          {/*  <Button onClick={() => setActivePanel(PanelIds.Test, { id: 5 })} size="m" stretched>Open Test</Button> */}
        </Div>
      </Group>
    </Panel>
  );
});
