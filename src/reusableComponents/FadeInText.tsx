import { useCurrentFrame, interpolate } from "remotion";

const intro: React.CSSProperties = {
  fontFamily: "SF Pro Text, Helvetica, Arial, sans-serif",
  fontSize: "130px",
  textAlign: "center",
  // position: "absolute",
  // bottom: "50%",
  background:
    "repeating-linear-gradient(to bottom left, #DEDEDE 0%, #A4A4A4 100%)",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: "bold",
};

interface props {
  firstLine: string;
  secondLine: string;
  isFast?: boolean;
}

const FadeInText: React.FC<props> = ({ firstLine, secondLine, isFast }) => {
  const frame = useCurrentFrame();
  const introOpacity = isFast
    ? interpolate(frame, [0, 5], [0, 1])
    : interpolate(frame, [0, 15], [0, 1]);
  const sitenameOpacity = isFast
    ? interpolate(frame, [5, 10], [0, 1])
    : interpolate(frame, [15, 30], [0, 1]);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "2rem",
      }}
    >
      <span style={{ ...intro, opacity: introOpacity }}>{firstLine} </span>
      <span style={{ ...intro, opacity: sitenameOpacity }}> {secondLine}</span>
    </div>
  );
};

export default FadeInText;
