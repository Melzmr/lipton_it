import { FC, useEffect, useRef } from 'react';
import { AdaptivityProvider, AppRoot, SizeType, SplitCol, SplitLayout, ViewWidth } from '@vkontakte/vkui';
import bridge from '@vkontakte/vk-bridge';
import { App } from '../App';

export const Adaptive: FC = () => {
  const node = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const anchorNode = node.current;

    if (!anchorNode) return;

    const resizeObserver = new ResizeObserver(([entry]) => {
      if (!entry) return;

      const { height, width } = entry.contentRect;
      bridge.send('VKWebAppResizeWindow', { width, height });
    });

    resizeObserver.observe(anchorNode);

    return () => {
      resizeObserver.unobserve(anchorNode);
    };
  }, []);

  return (
    <AdaptivityProvider sizeX={SizeType.REGULAR} sizeY={SizeType.COMPACT} viewWidth={ViewWidth.DESKTOP}>
      <AppRoot noLegacyClasses>
        <SplitLayout>
          <SplitCol animate={false}>
            <div ref={node}>
              <App />
            </div>
          </SplitCol>
        </SplitLayout>
      </AppRoot>
    </AdaptivityProvider>
  );
};
