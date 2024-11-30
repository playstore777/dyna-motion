import React, { useEffect } from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

interface props {
  x: number;
  y: number;
  defaultX?: number;
  defaultY?: number;
  onHover?: (value: boolean) => void;
}

export const FakeCursor: React.FC<Readonly<props>> = ({
  x,
  y,
  defaultX = 0,
  defaultY = 0,
  onHover,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cursorX = spring({
    frame,
    from: defaultX,
    to: x,
    fps,
    config: {
      mass: 1,
      damping: 15, // Increased damping for less bounciness
      stiffness: 100, // Decreased stiffness for a softer spring effect
    },
  });
  const cursorY = spring({
    frame,
    from: defaultY,
    to: y,
    fps,
    config: {
      mass: 1,
      damping: 15, // Increased damping for less bounciness
      stiffness: 100, // Decreased stiffness for a softer spring effect
    },
  });

  useEffect(() => {
    if (onHover && cursorX >= x && cursorY >= y) {
      onHover(true);
    }
  }, [cursorX, cursorY, x, y]);

  return (
    <div
      style={{
        width: 40,
        height: 40,
        borderRadius: "50%",
        zIndex: "99",
        position: "absolute",
        left: cursorX,
        top: cursorY,
        transform: "translate(-50%, -50%)",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="30"
        height="30"
        viewBox="0,0,256,256"
      >
        <g
          fill="#ffffff"
          fillRule="nonzero"
          stroke="#000"
          strokeWidth="1"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeDasharray=""
          strokeDashoffset="0"
          fontFamily="none"
          fontWeight="none"
          fontSize="none"
          textAnchor="none"
          style={{ mixBlendMode: "normal" }}
        >
          <g transform="scale(5.12,5.12)">
            <path d="M29.69922,47c-0.12109,0 -0.24219,-0.02344 -0.35937,-0.06641c-0.25,-0.09766 -0.44922,-0.28906 -0.55859,-0.53516l-5.83594,-13.49219l-7.26172,6.82422c-0.28906,0.27344 -0.71484,0.34375 -1.08203,0.1875c-0.36328,-0.15625 -0.60156,-0.51953 -0.60156,-0.91797v-33c0,-0.39844 0.23438,-0.75781 0.60156,-0.91797c0.36328,-0.15625 0.78906,-0.08594 1.08203,0.1875l24,22.39844c0.28906,0.26953 0.39063,0.6875 0.26172,1.05859c-0.12891,0.375 -0.46484,0.63672 -0.85937,0.67188l-10.18359,0.875l6.10547,13.3125c0.10938,0.23828 0.12109,0.51563 0.02734,0.76563c-0.09375,0.25 -0.27734,0.44922 -0.51953,0.55859l-4.40234,2c-0.13281,0.05859 -0.26953,0.08984 -0.41406,0.08984z" />
          </g>
        </g>
      </svg>
    </div>
  );
};
