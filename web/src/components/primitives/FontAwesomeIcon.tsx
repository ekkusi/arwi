import React from "react";

type IconProps = React.HTMLAttributes<HTMLElement> & {
  icon: string;
  [key: string]: any;
};

export default function FontAwesomeIcon({ icon, ...rest }: IconProps) {
  return (
    <span {...rest}>
      <i className={icon} />
    </span>
  );
}
