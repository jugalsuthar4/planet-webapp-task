export type ICommonProps = {
  className?: string;
  value: string | number;
  testId?: string;
  id: string;
  name: string;
  style?: React.CSSProperties;
  placeholder: string;
  isRequired?: boolean;
  label: string;
  disabled?:boolean;
};
