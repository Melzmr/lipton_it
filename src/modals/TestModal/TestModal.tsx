import { FC, memo } from 'react';

import { Div, ModalPage, ModalPageHeader, PanelHeaderButton } from '@vkontakte/vkui';
import { Icon24DoneOutline } from '@vkontakte/icons';

import { TDefaultModal } from '../TDefaultModal';

export const TestModal: FC<TDefaultModal> = memo(({ id, onClose }) => (
  <ModalPage id={id} onClose={onClose}>
    <ModalPageHeader
      right={
        <PanelHeaderButton>
          <Icon24DoneOutline onClick={onClose} />
        </PanelHeaderButton>
      }
    >
      Test VKUI Modal
    </ModalPageHeader>
    <Div>
      Some content
      <br />
      Some big content
    </Div>
  </ModalPage>
));
