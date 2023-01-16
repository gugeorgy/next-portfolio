import { TextProps } from './interface';

export default function Text({
  children,
  className,
  contentStyle,
  onPress,
  tag: Tag = 'span',
}: TextProps) {
  return (
    <Tag className={className} style={contentStyle} onClick={onPress}>
      {children}
    </Tag>
  );
}
