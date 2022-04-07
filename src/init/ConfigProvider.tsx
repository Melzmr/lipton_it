import { FC, useEffect, useState, useCallback } from 'react';

import bridge, { AnyReceiveMethodName, AppearanceSchemeType, VKBridgeEvent, VKUpdateConfigData } from '@vkontakte/vk-bridge';

import { ConfigProvider as VKUIConfigProvider, Scheme } from '@vkontakte/vkui';
import { Adaptive } from './Adaptive';

export const ConfigProvider: FC = () => {
  const [scheme, setScheme] = useState<AppearanceSchemeType>(Scheme.BRIGHT_LIGHT);

  const bridgeListener = useCallback(
    ({ detail: { type, data } }: VKBridgeEvent<AnyReceiveMethodName>) => {
      if (type !== 'VKWebAppUpdateConfig') {
        return;
      }

      setScheme((data as VKUpdateConfigData).scheme);
    },
    [],
  );

  useEffect(() => {
    bridge.subscribe(bridgeListener);
    void bridge.send('VKWebAppInit');

    return () => bridge.unsubscribe(bridgeListener);
  }, []);

  return (
    <VKUIConfigProvider scheme={scheme}>
      <Adaptive />
    </VKUIConfigProvider>
  );
};
