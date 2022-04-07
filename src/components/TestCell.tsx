import { RichCell, RichCellProps } from '@vkontakte/vkui';
import { CSSProperties } from 'react';

export function TestCell({
  style,
  disabled = true,
  ...cellProps
}: { style?: CSSProperties } & RichCellProps): JSX.Element {
  return (
    <RichCell
      disabled={disabled}
      multiline
      style={{
        boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.04), 0px 4px 4px rgba(0, 0, 0, 0.08)',
        borderRadius: 8,
        marginBottom: 12,
        backgroundColor: 'var(--modal_card_background',
        ...style,
      }}
      {...cellProps}
    />
  );
}
