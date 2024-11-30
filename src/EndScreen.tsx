import { AbsoluteFill } from "remotion";

interface props {
  isAudioEnabled?: boolean;
}

// const EndScreen: React.FC<props> = ({ isAudioEnabled = true }) => {
const EndScreen: React.FC<Readonly<props>> = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p style={{ color: "white", fontSize: "5rem", textAlign: "center" }}>
        <p>The End;</p>
        <p>Thank you for watching!</p>

        <p>This video was made using code </p>
        <div style={{ textAlign: "start" }}>
          <p>
            {`<`}
            <span
              style={{
                color: "#0b84f3",
              }}
            >
              Typescript
            </span>
            {`>`}
          </p>
          <p style={{ textAlign: "center" }}>
            {`<`}
            <span
              style={{
                color: "limegreen",
              }}
            >
              React
            </span>
            {`>`}
          </p>
          <p style={{ textAlign: "end" }}>
            {`<`}
            <span
              style={{
                color: "skyblue",
              }}
            >
              Remotion
            </span>{" "}
            {`/>`}
          </p>
          <p style={{ textAlign: "center" }}>
            {`</`}
            <span
              style={{
                color: "limegreen",
              }}
            >
              React
            </span>
            {`>`}
          </p>
          <p>
            {`</`}
            <span
              style={{
                color: "#0b84f3",
              }}
            >
              Typescript
            </span>
            {`>`}
          </p>
        </div>
      </p>
    </AbsoluteFill>
  );
};

export default EndScreen;
