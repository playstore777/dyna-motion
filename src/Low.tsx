import { AbsoluteFill, Sequence } from "remotion";

import { Features } from "./Features";
import Intro from "./Intro";
import { FeatureDetails } from "./FeatureDetails";

type props = {
  data: number[];
};

export const Low: React.FC<props> = ({ data }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <Sequence durationInFrames={290}>
        <Intro />
      </Sequence>
      <Sequence from={291}>
        <Features />
      </Sequence>
      <Sequence from={561}>
        <FeatureDetails doneCardIds={data} />
      </Sequence>
    </AbsoluteFill>
  );
};
