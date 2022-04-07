import { FC, useCallback, useEffect, useState } from 'react';
import bridge, {
  AnyReceiveMethodName,
  AppearanceSchemeType,
  VKBridgeEvent,
  VKUpdateConfigData,
} from '@vkontakte/vk-bridge';
import { ConfigProvider as VKUIConfigProvider, Platform, Scheme, WebviewType } from '@vkontakte/vkui';
import { Adaptive } from './Adaptive';

export const ConfigProvider: FC = () => {
  const [scheme, setScheme] = useState<AppearanceSchemeType>(Scheme.BRIGHT_LIGHT);

  const bridgeListener = useCallback(({ detail: { type, data } }: VKBridgeEvent<AnyReceiveMethodName>) => {
    if (type !== 'VKWebAppUpdateConfig') {
      return;
    }

    setScheme((data as VKUpdateConfigData).scheme);
  }, []);

  useEffect(() => {
    bridge.subscribe(bridgeListener);
    bridge.send('VKWebAppInit');

    return () => bridge.unsubscribe(bridgeListener);
  }, [bridgeListener]);

  return (
    <VKUIConfigProvider scheme={scheme} platform={Platform.VKCOM} webviewType={WebviewType.INTERNAL}>
      <Adaptive />
    </VKUIConfigProvider>
  );
};
