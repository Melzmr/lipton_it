import { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import { ConfigProvider } from 'init/ConfigProvider';

import '@vkontakte/vkui/dist/vkui.css';

ReactDOM.render(
  <StrictMode>
    <ConfigProvider />
  </StrictMode>,
  document.getElementById('root')
);
