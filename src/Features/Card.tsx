import { Img, spring, useCurrentFrame, useVideoConfig } from "remotion";

import { cardHeight, cardMargin, cardWidth } from "./constants";

export const Card: React.FC<{
  isHovered: boolean;
  index: number;
  imgSrc: string;
  title: string;
}> = ({ isHovered, index, imgSrc, title }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scale effect on hover
  const scale = spring({
    frame: frame - index * 30, // Offset hover effect based on index
    fps,
    from: 1,
    to: isHovered ? 1.1 : 1,
    config: {
      mass: 1,
      damping: 10,
      stiffness: 100,
    },
  });

  // Shadow effect on hover
  const shadow = isHovered ? "5px 10px 20px rgba(244,244,244,0.7)" : "none";

  return (
    <div
      style={{
        width: cardWidth + "px",
        height: cardHeight + "px",
        margin: cardMargin + "px",
        borderRadius: 10,
        boxShadow: shadow,
        transform: `scale(${scale})`,
        backgroundColor: "#333",
        transition: "boxShadow 0.3s ease",
        color: "white",
      }}
    >
      <Img src={imgSrc} style={{ width: "100%" }} />
      <center>
        <h1>{title}</h1>
      </center>
    </div>
  );
};
