import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { ConfigProvider } from 'init/ConfigProvider';
import { store } from 'store/store';

import '@vkontakte/vkui/dist/vkui.css';

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <ConfigProvider />
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);
