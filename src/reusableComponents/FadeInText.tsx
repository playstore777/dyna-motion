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

const FadeInText: React.FC<{ firstLine: string; secondLine: string }> = ({
  firstLine,
  secondLine,
}) => {
  const frame = useCurrentFrame();
  const introOpacity = interpolate(frame, [0, 15], [0, 1]);
  const sitenameOpacity = interpolate(frame, [15, 30], [0, 1]);
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
