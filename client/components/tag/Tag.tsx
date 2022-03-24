import { DetailedHTMLProps, HTMLAttributes } from "react";

//
export enum TAG_TYPES {
  DEFAULT = "default",
  INFO = "info",
  WARNING = "warning",
  SUCCESS = "success",
  DANGER = "danger",
}

//
interface ITags
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  label?: string;
  icon?: React.ReactNode;
  type?: TAG_TYPES;
}

//
export const Tag = ({
  icon,
  label,
  type = TAG_TYPES.DEFAULT,
  children,
  className,
  ...props
}: ITags) => {
  return (
    <div
      className={`
        tag 
        text-sm
        ${type} ${className}
      `}
      {...props}
    >
      {icon && icon}
      {label && label}
      {children && children}
    </div>
  );
};
