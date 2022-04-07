import { FC } from 'react';
import { AdaptivityProvider, AppRoot, SplitCol, SplitLayout } from '@vkontakte/vkui';

import { App } from '../App';

export const Adaptive: FC = () => (
  <AdaptivityProvider>
    <AppRoot>
      <SplitLayout>
        <SplitCol animate={false}>
          <App />
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  </AdaptivityProvider>
);
