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
  const isPrivateFromStore = useCreateTestStore((state) => state.isPrivate);
  const updateIsPrivate = useCreateTestStore((state) => state.updateIsPrivate);
  const platformFromStore = useCreateTestStore((state) => state.platform);
  const updatePlatform = useCreateTestStore((state) => state.updatePlatform);
  const { isEditing } = panelProps.current ?? {};
  const [title, setTitle] = useState<string>(name ?? '');
  const [description, setDescription] = useState<string>(descriptionFromStore ?? '');
  const [isPrivate, setIsPrivate] = useState<boolean>(isPrivateFromStore ?? false);
  const [platform, setPlatform] = useState<'mobile' | 'desktop'>(platformFromStore ?? 'desktop');

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
                ??????????
              </Text>
            </Tappable>
          }
        >
          {testType && getCaption(testType)}
        </PanelHeader>
        <Spacing style={{ padding: 0 }} separator />
        <FormItem top="???????????????? ??????????">
          <Input
            onBlur={() => updateName(title)}
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
            placeholder="?????????????? ???????????????? ??????????"
          />
        </FormItem>
        <FormItem top="???????????????? ??????????">
          <Input
            onBlur={() => updateDescription(description)}
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
            placeholder="?????????????? ????????????????"
          />
        </FormItem>
        <FormItem top="??????????????????">
          <RadioGroup mode="horizontal" style={{ width: 440 }}>
            <Radio
              onChange={() => {
                updatePlatform('desktop');
                setPlatform('desktop');
              }}
              checked={platform === 'desktop'}
            >
              ??????????????
            </Radio>
            <Radio
              onChange={() => {
                updatePlatform('mobile');
                setPlatform('mobile');
              }}
              checked={platform === 'mobile'}
            >
              ?????????????????? ??????????????
            </Radio>
          </RadioGroup>
        </FormItem>
        <FormItem top="??????????????????????">
          <Checkbox
            onChange={(e) => {
              updateIsPrivate(e.target.checked);
              setIsPrivate(e.target.checked);
            }}
            checked={isPrivate}
            style={{ width: 275 }}
          >
            ???????? ???????????????? ???????????? ???? ????????????
          </Checkbox>
        </FormItem>
        <Spacing separator />
        <Div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Headline weight="regular">??????????????</Headline>
          {!isEditing && (
            <Link onClick={() => setActivePanel(PanelIds.CreateQuestion)}>
              <Subhead>???????????????? ????????????</Subhead>
            </Link>
          )}
        </Div>
        <div style={isEditing ? { opacity: 0.4 } : {}}>
          {questions?.map(({ title, data }, idx) => (
            <TestCell
              caption={data.length === 1 ? '1 ????????????????' : data.length === 2 ? '2 ????????????????' : '0 ????????????????'}
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
          {!isEditing && <Subhead>?????????? ???????????????????? ?????????????????????????? ?????????????? ????????????</Subhead>}
          <Button
            disabled={!(questions?.length && questions.length > 0 && description && title)}
            onClick={handleSubmit}
          >
            ???????????????????????? ????????
          </Button>
        </Div>
      </Group>
    </Panel>
  );
});
