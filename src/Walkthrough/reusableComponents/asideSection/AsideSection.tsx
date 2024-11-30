/**
 * @param {Props} props - The properties for rendering.
 * @param {ReactNode} [props.children] - The children to render.
 * @param {Function} [props.onClose] - Method to trigger after close.
 */

import { ReactNode } from "react";

import classes from "./AsideSection.module.css";

interface props {
  children: ReactNode;
  onClose: () => void;
}

const AsideSection: React.FC<props> = ({ children, onClose }) => {
  const onClickAsideHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  return (
    <div className={classes.asideSectionWrapper} onClick={onClose}>
      <aside className={classes.aside} onClick={onClickAsideHandler}>
        <button className={classes.closeBtn} onClick={onClose}>
          X
        </button>
        {children}
      </aside>
    </div>
  );
};

export default AsideSection;
