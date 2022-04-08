import { Div, Spacing, Subhead, Headline, Link } from '@vkontakte/vkui';
import { Image } from '../../components/Image';
import type { IQuestionWithResults } from './Statistic';

type TSideBySideStatProps = {
  question: IQuestionWithResults;
  sep: boolean;
  title: string;
};

type TFiveSec = {
  date: string;
  text: string;
};

const Comment = ({ date, text }: TFiveSec) => {
  return (
    <>
      <Spacing size={16} />
      <Subhead style={{ color: 'var(--text_secondary)', paddingBottom: 4 }}>
        {new Date(date).toLocaleDateString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
      </Subhead>
      <Headline weight="regular">{text}</Headline>
    </>
  );
};

export const FiveSecStat = ({ question, title, sep }: TSideBySideStatProps) => {
  return (
    <>
      {sep && <Spacing separator size={12} />}

      <Div>
        <Subhead style={{ color: 'var(--text_secondary)', paddingBottom: 4 }}>{title}</Subhead>
        <Headline weight="regular">{question.title}</Headline>
        <Spacing size={16} />
        <Link href={question.data?.[0]} target="_blank">
          <Image imgUrl={question.data?.[0]} style={{ borderRadius: '8px' }} />
        </Link>
        {question.results.map((res) => (
          <Comment date={res.createdAt} text={res.data} key={res.createdAt} />
        ))}
      </Div>
    </>
  );
};
