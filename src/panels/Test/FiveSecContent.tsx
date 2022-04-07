import { useState } from 'react';
import { Questions } from './Questions';
import { Image } from '../../components/Image';
import { TTest } from '../../store/testsMocks';

const questionsMocks: { question: string; id: number }[] = [
  {
    id: 0,
    question: 'Куда бы вы нажали, чтобы увидеть полный список сервисов?',
  },
  {
    id: 1,
    question: 'Куда бы вы нажали, чтобы увидеть полный список сервисов?',
  },
  {
    id: 2,
    question: 'Куда бы вы нажали, чтобы увидеть полный список сервисов?',
  },
  {
    id: 3,
    question: 'Куда бы вы нажали, чтобы увидеть полный список сервисов?',
  },
];

export function FiveSecContent({ title }: TTest): JSX.Element {
  const [showQuestions, setShowQuestions] = useState(false);
  const questions = questionsMocks;
  const img = 'https://vkpay.com/index/images/desktop_header_image2x.png';

  return showQuestions ? (
    <Questions questions={questions} title={title} />
  ) : (
    <Image
      imgUrl={img}
      onLoadCallback={() =>
        setTimeout(() => {
          setShowQuestions(true);
        }, 5000)
      }
    />
  );
}
