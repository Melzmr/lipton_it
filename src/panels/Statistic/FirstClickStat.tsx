import { Headline, Spacing, Subhead } from '@vkontakte/vkui';
import { useState } from 'react';
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
} & ImageDimensions;

function Bullet({ x, y, imgWidth, imgHeight }: TBullet) {
  return (
    <div
      style={{
        position: 'absolute',
        borderRadius: '50%',
        left: +(imgWidth - imgWidth * (x / 100)).toFixed(0),
        top: +(imgHeight - imgHeight * (y / 100)).toFixed(0),
        backgroundColor: '#ff0000',
        border: '1px solid #008000',
        opacity: 0.5,
        width: 5,
        height: 5,
      }}
    />
  );
}

type ImageDimensions = { imgWidth: number; imgHeight: number };

export function FirstClickStat({ question, title, sep }: TSideBySideStatProps) {
  const [imgDimensions, setImgDimensions] = useState<ImageDimensions | null>(null);

  const updateImgDimensions = (img?: HTMLImageElement) => {
    if (img) {
      const { width, height } = img.getBoundingClientRect();
      setImgDimensions({ imgHeight: height, imgWidth: width });
    }
  };

  return (
    <>
      {sep && <Spacing separator size={12} />}

      <Subhead style={{ color: 'var(--text_secondary)', paddingBottom: 4 }}>{title}</Subhead>
      <Headline weight="regular">{question.title}</Headline>
      <Spacing size={16} />
      <div style={{ position: 'relative' }}>
        {imgDimensions && (
          <div style={{ position: 'absolute', width: '100%', height: '100%', left: 0, top: 0 }}>
            {question.results.map((res) => {
              const [x, y] = res.data.split('|');

              return (
                <Bullet
                  x={+x}
                  y={+y}
                  key={res.data}
                  imgWidth={imgDimensions.imgWidth}
                  imgHeight={imgDimensions.imgHeight}
                />
              );
            })}
          </div>
        )}
        <Image
          imgUrl={question.data?.[0]}
          style={{ borderRadius: '8px', width: 500 }}
          onLoadCallback={updateImgDimensions}
        />
      </div>
    </>
  );
}
