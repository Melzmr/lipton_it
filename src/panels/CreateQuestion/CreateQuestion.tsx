import { FC, memo, useState } from 'react';
import { Icon28ChevronLeftOutline } from '@vkontakte/icons';
import { Button, FormItem, Group, Input, Panel, PanelHeader, Spacing, Tappable, Text } from '@vkontakte/vkui';
import { TPanel } from '../TPanel';
import { useRouterStore } from '../../store';
import { useCreateTestStore } from '../../store/createTestStore';

export const CreateQuestion: FC<TPanel> = memo(({ id }) => {
  const [title, setTitle] = useState<string>();
  const [href, setHref] = useState<string>();
  const [href2, setHref2] = useState<string>();
  const closeActivePanel = useRouterStore((state) => state.closeActivePanel);
  const appendQuestion = useCreateTestStore((state) => state.appendQuestion);
  const testType = useCreateTestStore((state) => state.type);

  const handleSave = () => {
    if (title && href) {
      appendQuestion({
        title,
        data: [href, href2],
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
            <Input value={href} onChange={(ev) => setHref(ev.target.value)} placeholder="Введите ссылку на картинку" />
          </FormItem>
          {testType === 'side_by_side' && (
            <FormItem top="Вторая картинка">
              <Input
                value={href2}
                onChange={(ev) => setHref2(ev.target.value)}
                placeholder="Введите ссылку на вторую картинку"
              />
            </FormItem>
          )}
        </div>
        <div style={{ paddingTop: 24, textAlign: 'right' }}>
          <Button mode="secondary" style={{ marginRight: 10 }} onClick={closeActivePanel}>
            Не сохранять
          </Button>
          <Button onClick={handleSave} disabled={!title || !href}>
            Сохранить
          </Button>
        </div>
      </Group>
    </Panel>
  );
});
