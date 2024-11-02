import React from "react";

import { AbsoluteFill, Img, interpolate, useCurrentFrame } from "remotion";

import { FONT_FAMILY } from "./constants";
import MediumLandingPage from "../assets/images/medium_landing_page.png";

const inspire: React.CSSProperties = {
  fontFamily: FONT_FAMILY,
  fontSize: "64px",
  textAlign: "center",
  color: "white",
  fontWeight: "bold",
};

export const Inspiration: React.FC = () => {
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
      <Img src={MediumLandingPage} />
      <AbsoluteFill
        style={{
          left: "48%",
          top: "86%",
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
        }}
      >
        <span style={{ ...inspire, opacity: introOpacity }}>Inspired by </span>
        <span style={{ ...inspire, opacity: sitenameOpacity }}>Medium.com</span>
      </AbsoluteFill>
    </div>
  );
};
