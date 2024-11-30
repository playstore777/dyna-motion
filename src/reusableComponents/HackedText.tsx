import { forwardRef, useImperativeHandle, useRef, useState } from "react";

import { random } from "remotion";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

interface props {
  readonly text: string;
  readonly listOfText: string[];
}

interface refProps {
  hackText: () => void;
}

const HackedText = forwardRef<refProps, props>(({ text, listOfText }, ref) => {
  const intervalTimerRef = useRef<number | null>(null);
  const [textToHack, setTextToHack] = useState(text);
  const [textIndex, setTextIndex] = useState(1);

  const hackText = () => {
    let iteration = 0;

    clearInterval(intervalTimerRef.current as unknown as number);

    intervalTimerRef.current = setInterval(() => {
      setTextToHack(() => {
        return listOfText[textIndex]
          .split("")
          .map((_: string, index: number) => {
            if (index < iteration) {
              return listOfText[textIndex][index].toUpperCase();
            }

            return LETTERS[Math.floor(random(null) * 26)];
          })
          .join("");
      });

      if (iteration >= listOfText[textIndex].length) {
        clearInterval(intervalTimerRef.current as unknown as number);
      }

      iteration += 1 / 3;
    }, 30) as unknown as number;

    // setTextIndex((prev) => (prev + 1 < listOfText.length ? prev + 1 : 0));
    setTextIndex(1);
  };

  useImperativeHandle(ref, () => ({
    hackText,
  }));

  return (
    <h1
      style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: "clamp(3rem, 10vw, 10rem)",
        color: "white",
        padding: "0rem clamp(1rem, 2vw, 3rem)",
        borderRadius: "clamp(0.4rem, 0.75vw, 1rem)",
      }}
      onMouseOver={hackText}
    >
      {textToHack.toUpperCase()}
    </h1>
  );
});

export default HackedText;
