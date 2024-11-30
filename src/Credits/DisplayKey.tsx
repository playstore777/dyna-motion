import { useEffect } from "react";

interface props {
  keyname: string;
  onEnd?: () => void;
}

const DisplayKey: React.FC<props> = ({ keyname, onEnd }) => {
  useEffect(() => {
    return () => {
      onEnd && onEnd();
    };
  }, []);
  return (
    <span
      style={{
        position: "absolute",
        left: "37%",
        bottom: "20%",
        backgroundColor: "rgb(163 163 163 / 85%)",
        fontSize: "3.5rem",
        padding: "1rem",
        borderRadius: "6px",
        fontWeight: "bold",
        fontFamily: "monospace",
      }}
    >
      {keyname}
    </span>
  );
};

export default DisplayKey;
