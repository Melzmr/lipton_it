import { Headline, Spacing, Subhead } from '@vkontakte/vkui';
import { Image } from '../../components/Image';
import type { IQuestionWithResults } from './Statistic';

type TSideBySideStatProps = {
  question: IQuestionWithResults;
  sep: boolean;
  title: string;
};

type TBullet = {
  x: number;
  y: number;
};

const Bullet = ({ x, y }: TBullet) => {
  return (
    <div
      style={{
        position: 'absolute',
        borderRadius: '50%',
        left: x,
        top: y,
        backgroundColor: '#ff0000',
        border: '1px solid #008000',
        opacity: 0.5,
        width: 5,
        height: 5,
      }}
    />
  );
};

export const FirstClickStat = ({ question, title, sep }: TSideBySideStatProps) => {
  return (
    <>
      {sep && <Spacing separator size={12} />}

      <Subhead style={{ color: 'var(--text_secondary)', paddingBottom: 4 }}>{title}</Subhead>
      <Headline weight="regular">{question.title}</Headline>
      <Spacing size={16} />
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', width: '100%', height: '100%', left: 0, top: 0 }}>
          {question.results.map((res) => {
            const [x, y] = res.data.split('|');

            return <Bullet x={+x} y={+y} key={res.data} />;
          })}
        </div>
        <Image imgUrl={question.data?.[0]} style={{ borderRadius: '8px' }} />
      </div>
    </>
  );
};
