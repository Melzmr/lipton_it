import { FC, memo, useRef, useState } from 'react';
import { Icon28ChevronLeftOutline } from '@vkontakte/icons';
import { Button, FormItem, Group, Input, Panel, PanelHeader, Spacing, Tappable, Text } from '@vkontakte/vkui';
import { TPanel } from '../TPanel';
import { useRouterStore } from '../../store';
import { useCreateTestStore } from '../../store/createTestStore';

export const CreateQuestion: FC<TPanel> = memo(({ id }) => {
  const [title, setTitle] = useState<string>();
  const closeActivePanel = useRouterStore((state) => state.closeActivePanel);
  const appendQuestion = useCreateTestStore((state) => state.appendQuestion);
  const testType = useCreateTestStore((state) => state.type);

  const hrefRef = useRef<any>(null);
  const href2Ref = useRef<any>(null);

  const handleSave = async () => {
    if (
      title &&
      hrefRef.current.files[0] &&
      ((testType === 'side_by_side' && href2Ref.current.files[0]) || testType !== 'side_by_side')
    ) {
      const formData = new FormData();

      if (hrefRef.current) {
        formData.append('images', hrefRef.current.files[0], hrefRef.current.files[0].name);
        if (href2Ref.current) {
          formData.append('images', href2Ref.current.files[0], href2Ref.current.files[0].name);
        }
      }

      const response = await fetch('https://lipton-it.vkpay.prod.kapps.vk-apps.ru/api/file/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      appendQuestion({
        title,
        data: result.images,
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
            <Input getRef={hrefRef} type="file" accept="image/*" />
          </FormItem>
          {testType === 'side_by_side' && (
            <FormItem top="Вторая картинка">
              <Input getRef={href2Ref} type="file" placeholder="Введите ссылку на вторую картинку" accept="image/*" />
            </FormItem>
          )}
        </div>
        <div style={{ paddingTop: 24, textAlign: 'right' }}>
          <Button mode="secondary" style={{ marginRight: 10 }} onClick={closeActivePanel}>
            Не сохранять
          </Button>
          <Button onClick={handleSave} disabled={!title || !hrefRef.current.files[0]}>
            Сохранить
          </Button>
        </div>
      </Group>
    </Panel>
  );
});
