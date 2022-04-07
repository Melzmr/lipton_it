import { ChangeEvent, FC, memo, useRef, useState } from 'react';
import { Icon24Document, Icon28ChevronLeftOutline } from '@vkontakte/icons';
import { Button, File, FormItem, Group, Input, Panel, PanelHeader, Spacing, Tappable, Text } from '@vkontakte/vkui';
import { TPanel } from '../TPanel';
import { useRouterStore } from '../../store';
import { TestType } from '../../store/testsMocks';
import { useCreateTestStore } from '../../store/createTestStore';

export const CreateQuestion: FC<TPanel> = memo(({ id }) => {
  const [title, setTitle] = useState<string>();
  // const [img, setImg] = useState<any>();
  // const [img2, setImg2] = useState<any>();
  const fileRef = useRef<HTMLInputElement>(null);
  const file2Ref = useRef<HTMLInputElement>(null);
  // const setActivePanel = useRouterStore((state) => state.setActivePanel);
  const closeActivePanel = useRouterStore((state) => state.closeActivePanel);
  const appendQuestion = useCreateTestStore((state) => state.appendQuestion);
  const panelProps = useRef<{ testType: TestType }>(
    useRouterStore((state) => state.panelParams[state.panelParams.length - 1]) as { testType: TestType },
  );
  const { testType } = panelProps.current ?? {};

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      // TODO: send to album
      console.log(event.target?.result);
    };

    reader.readAsText(file);
  };

  const handleSave = () => {
    if (title) {
      appendQuestion({
        question: title,
        // TODO
        urls: ['TODO'],
      });
      closeActivePanel();
    }
  };

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
          Вопрос
        </PanelHeader>
        <Spacing style={{ padding: 0 }} separator />
        <FormItem top="Формулировка вопроса">
          <Input
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
            placeholder="Введите формулировку вопроса"
          />
        </FormItem>
        <div style={{ display: 'flex' }}>
          <FormItem top="Картинка">
            <File
              getRef={fileRef}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleFileChange(e)}
              accept="image/png, image/jpeg"
              before={<Icon24Document />}
              controlSize="m"
              mode="secondary"
            />
          </FormItem>
          {testType === 'side_by_side' && (
            <FormItem top="Картинка">
              <File
                getRef={file2Ref}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleFileChange(e)}
                accept="image/png, image/jpeg"
                before={<Icon24Document />}
                controlSize="m"
                mode="secondary"
              />
            </FormItem>
          )}
        </div>
        <div style={{ paddingTop: 24, textAlign: 'right' }}>
          <Button mode="secondary" style={{ marginRight: 10 }} onClick={closeActivePanel}>
            Не сохранять
          </Button>
          <Button onClick={handleSave}>Сохранить</Button>
        </div>
      </Group>
    </Panel>
  );
});
