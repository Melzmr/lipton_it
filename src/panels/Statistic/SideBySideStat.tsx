import { Div, Link, Spacing, Subhead, Headline, Progress } from '@vkontakte/vkui';
import { Image } from '../../components/Image';
import type { IQuestionWithResults } from './Statistic';

type TSideBySideStatProps = {
  question: IQuestionWithResults;
  sep: boolean;
  title: string;
};

type TProgressWithLabelProps = {
  percent: number;
  label: string;
  gap?: boolean;
};

const ProgressWithLabel = ({ percent, label, gap }: TProgressWithLabelProps) => {
  return (
    <>
      <Progress value={percent} style={{ marginBottom: 6 }} />
      <Headline weight="regular">{label}</Headline>
      {gap && <Spacing size={24} />}
    </>
  );
};

export const SideBySideStat = ({ question, title, sep }: TSideBySideStatProps) => {
  const total = question.results.length;
  const firstTotal = question.results.filter((item) => item.data === '0').length;
  const twoTotal = question.results.filter((item) => item.data === '1').length;

  return (
    <>
      {sep && <Spacing separator size={12} />}

      <Div>
        <Subhead style={{ color: 'var(--text_secondary)', paddingBottom: 4 }}>{title}</Subhead>
        <Headline weight="regular">{question.title}</Headline>
        <Spacing size={16} />
        <div style={{ display: 'flex', alignItems: 'center', gridGap: '16px' }}>
          {question.data.map((image, idx) => (
            <Link key={`${image}_${idx}`} href={image} target="_blank">
              <Image imgUrl={image} style={{ borderRadius: '8px' }} />
            </Link>
          ))}
        </div>
        <Spacing size={16} />
        <ProgressWithLabel
          percent={(firstTotal / total) * 100}
          label={`Первый вариант — ${firstTotal} (${Math.floor((firstTotal / total) * 100)}%)`}
          gap
        />
        <ProgressWithLabel
          percent={(twoTotal / total) * 100}
          label={`Второй вариант — ${twoTotal} (${Math.floor((twoTotal / total) * 100)}%)`}
        />
      </Div>
    </>
  );
};
