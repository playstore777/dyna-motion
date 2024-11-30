import { useEffect, useState } from "react";

import classes from "./FancyText.module.css";
import { FakeCursor } from "./FakeCursor";

interface props {
  topLine: string;
  middleLine: string;
  lastLine: string;
  mainTopic: string;
  indexOfO: number;
}

const FancyText: React.FC<props> = ({
  topLine,
  middleLine,
  lastLine,
  mainTopic,
  indexOfO,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [cursorPos, setCursorPos] = useState<
    { x: number; y: number } | undefined
  >();

  useEffect(() => {
    const ml = document.querySelector("#middle-line") as HTMLElement;
    setCursorPos({
      x: ml?.offsetLeft ? ml.offsetLeft + 140 : 0,
      y: ml?.offsetTop ? ml.offsetTop : 0,
    });
  }, []);

  const updateIsHovering = (value: boolean) => {
    setIsHovering(value);
  };

  return (
    <>
      <h1
        className={`${classes.fancyTextWrapper} ${isHovering ? classes.hovering : ""}`}
      >
        <span>{topLine}</span>
        <span id="middle-line" className={classes["sr-only"]}>
          {middleLine}
        </span>
        <span aria-hidden="true">
          {middleLine.length &&
            middleLine.split("").map((x, index) =>
              index === indexOfO ? (
                <span key={index + x} className={classes["stretch-o"]}>
                  <span className={classes["inside-text"]}>{mainTopic}</span>
                </span>
              ) : (
                <span key={index + x}>{x}</span>
              )
            )}
        </span>
        <span>{lastLine}</span>
      </h1>
      {cursorPos && (
        <FakeCursor
          x={cursorPos?.x}
          y={cursorPos?.y}
          onHover={updateIsHovering}
        />
      )}
    </>
  );
};

export default FancyText;
