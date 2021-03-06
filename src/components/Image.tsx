import React, { useEffect, useRef, useState } from 'react';
import { PanelSpinner } from '@vkontakte/vkui';

export function Image({
  imgUrl,
  onLoadCallback,
  onClick,
  ...rest
}: {
  imgUrl: string;
  onLoadCallback?: (ref?: HTMLImageElement) => void;
  onClick?: (e: React.MouseEvent<HTMLImageElement>, left?: number, top?: number) => void;
} & Omit<
  React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
  'onClick'
>): JSX.Element {
  const imgRef = useRef<HTMLImageElement>(null);
  const [imgIsLoaded, setImgIsLoaded] = useState(false);
  const onLoadCallbackRef = useRef(onLoadCallback).current;

  useEffect(() => {
    if (imgUrl && imgRef.current && !imgIsLoaded) {
      imgRef.current.onload = () => {
        if (imgRef.current) {
          imgRef.current.style.display = 'block';
          setImgIsLoaded(true);
          onLoadCallbackRef?.(imgRef.current);
        }
      };

      //  на ios не файрится событие onload для img
      if (imgRef.current.complete) {
        // Костыль но онлоад требует ивент
        imgRef.current.onload(new Event('onload'));
      }
    }
  }, [imgUrl, imgIsLoaded, setImgIsLoaded, imgRef.current?.complete, onLoadCallbackRef]);

  return (
    <>
      {!imgIsLoaded && <PanelSpinner />}
      <img
        ref={imgRef}
        src={imgUrl}
        width="100%"
        alt=""
        onClick={(e) => {
          const { left, top } = imgRef.current?.getBoundingClientRect() ?? {};

          onClick?.(e, left, top);
        }}
        {...rest}
      />
    </>
  );
}
