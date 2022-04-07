import { FC, memo } from 'react';

import { ModalRoot } from '@vkontakte/vkui';

import { ModalIds } from 'init/routerEnums';

import { TestModal } from './TestModal/TestModal';
import { useRouterStore } from '../store';

export const RootModal: FC = memo(() => {
  const activeModal = useRouterStore((state) => state.activeModal)
  const closeActiveModal = useRouterStore((state) => state.closeActiveModal)

  return (
    <ModalRoot activeModal={activeModal}>
      <TestModal id={ModalIds.TestModal} onClose={closeActiveModal} />
    </ModalRoot>
  );
});
