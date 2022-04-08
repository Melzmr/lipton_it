import { Questions } from './Questions';
import { TTestData } from '../../store/testsMocks';

export function FiveSecContent({ title, questions }: TTestData): JSX.Element {
  return <Questions questions={questions} title={title} />;
}
