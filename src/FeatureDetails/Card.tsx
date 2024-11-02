import { Img, spring, useCurrentFrame, useVideoConfig } from "remotion";

import { cardHeight, cardMargin, cardPadding } from "./constants";
import FancyText from "./FancyText";

interface props {
  isHighlighted: boolean;
  index: number;
  imgSrc: string;
  title: string;
  details: {
    topLine: string;
    middleLine: string;
    lastLine: string;
    mainTopic: string;
    indexOfO: number;
  };
}

const Card: React.FC<props> = ({ details, isHighlighted, index, imgSrc }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scale effect on hover
  const scale = spring({
    frame: frame - index * 30, // Offset hover effect based on index
    fps,
    from: 1,
    to: isHighlighted ? 1.1 : 1,
    config: {
      mass: 1,
      damping: 10,
      stiffness: 100,
    },
  });

  // Shadow effect on hover
  const shadow = isHighlighted ? "5px 10px 20px rgba(244,244,244,0.7)" : "none";

  return (
    <div
      style={{
        height: cardHeight + "px",
        margin: cardMargin + "px",
        padding: cardPadding + "px",
        borderRadius: 10,
        boxShadow: shadow,
        transform: `scale(${scale})`,
        backgroundColor: "#333",
        transition: "boxShadow 0.3s ease",
        color: "white",
        display: "flex",
        gap: "2rem",
      }}
    >
      <Img src={imgSrc} style={{ width: "100%" }} />
      <FancyText
        topLine={details.topLine}
        middleLine={details.middleLine}
        lastLine={details.lastLine}
        mainTopic={details.mainTopic}
        indexOfO={details.indexOfO}
      />
    </div>
  );
};

export default Card;
