import { FC, memo, useRef, useState } from 'react';
import { Icon20TrashSmileOutline, Icon28ChevronLeftOutline } from '@vkontakte/icons';
import {
  Button,
  Checkbox,
  Div,
  FormItem,
  Group,
  Headline,
  Input,
  Link,
  Panel,
  PanelHeader,
  Radio,
  RadioGroup,
  Spacing,
  Subhead,
  Tappable,
  Text,
} from '@vkontakte/vkui';
import { TPanel } from '../TPanel';
import { useRouterStore } from '../../store';
import { useCreateTestStore } from '../../store/createTestStore';
import { getCaption } from '../../utils';
import { PanelIds } from '../../init/routerEnums';
import { TestCell } from '../../components/TestCell';
import { fetchData } from '../../api/Api';

export const EditQuestion: FC<TPanel> = memo(({ id }) => {
  const closeActivePanel = useRouterStore((state) => state.closeActivePanel);
  const setActivePanel = useRouterStore((state) => state.setActivePanel);
  const testType = useCreateTestStore((state) => state.type);
  const clearAll = useCreateTestStore((state) => state.clearAll);
  const deleteQuestion = useCreateTestStore((state) => state.deleteQuestion);
  const updateName = useCreateTestStore((state) => state.updateName);
  const name = useCreateTestStore((state) => state.name);
  const descriptionFromStore = useCreateTestStore((state) => state.description);
  const updateDescription = useCreateTestStore((state) => state.updateDescription);
  const questions = useCreateTestStore((state) => state.questions);
  const panelProps = useRef<{ isEditing: boolean }>(
    useRouterStore((state) => state.panelParams[state.panelParams.length - 1]) as { isEditing: boolean },
  );
  const { isEditing } = panelProps.current ?? {};
  const [title, setTitle] = useState<string>(name ?? '');
  const [description, setDescription] = useState<string>(descriptionFromStore ?? '');
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [platform, setPlatform] = useState<'mobile' | 'desktop'>('desktop');

  const handleSubmit = async () => {
    if (questions?.length && questions.length > 0 && description && title) {
      // TODO API CREATE TEST
      await fetchData('/test', 'POST', {
        title,
        testType,
        status: 'available',
        description,
        questions,
        isPrivate,
        platform,
      });
      // TODO isEditing = true THEN PUT
      // PUT BALHBALBLA
      clearAll();
      closeActivePanel();
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
              onClick={() => {
                closeActivePanel();
                clearAll();
              }}
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
          {testType && getCaption(testType)}
        </PanelHeader>
        <Spacing style={{ padding: 0 }} separator />
        <FormItem top="Название теста">
          <Input
            onBlur={() => updateName(title)}
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
            placeholder="Введите название теста"
          />
        </FormItem>
        <FormItem top="Описание теста">
          <Input
            onBlur={() => updateDescription(description)}
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
            placeholder="Введите описание"
          />
        </FormItem>
        <FormItem top="Платформа">
          <RadioGroup mode="horizontal" style={{ width: 440 }}>
            <Radio onChange={() => setPlatform('desktop')} checked={platform === 'desktop'}>
              Десктоп
            </Radio>
            <Radio onChange={() => setPlatform('mobile')} checked={platform === 'mobile'}>
              Мобильный телефон
            </Radio>
          </RadioGroup>
        </FormItem>
        <FormItem top="Доступность">
          <Checkbox onChange={(e) => setIsPrivate(e.target.checked)} checked={isPrivate} style={{ width: 275 }}>
            Тест доступен только по ссылке
          </Checkbox>
        </FormItem>
        <Spacing separator />
        <Div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Headline weight="regular">Вопросы</Headline>
          {!isEditing && (
            <Link onClick={() => setActivePanel(PanelIds.CreateQuestion)}>
              <Subhead>Добавить вопрос</Subhead>
            </Link>
          )}
        </Div>
        <div style={isEditing ? { opacity: 0.4 } : {}}>
          {questions?.map(({ title, data }, idx) => (
            <TestCell
              caption={data.length === 1 ? '1 картинка' : data.length === 2 ? '2 картинки' : '0 картинок'}
              after={
                <Tappable onClick={() => deleteQuestion(idx)}>
                  <Icon20TrashSmileOutline fill="var(--icon_medium)" />
                </Tappable>
              }
            >
              {title}
            </TestCell>
          ))}
        </div>
        <Spacing separator />
        <Div style={{ display: 'flex', justifyContent: isEditing ? 'flex-end' : 'space-between', paddingTop: 24 }}>
          {!isEditing && <Subhead>После публикации редактировать вопросы нельзя</Subhead>}
          <Button
            disabled={!(questions?.length && questions.length > 0 && description && title)}
            onClick={handleSubmit}
          >
            Опубликовать тест
          </Button>
        </Div>
      </Group>
    </Panel>
  );
});
