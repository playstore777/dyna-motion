import { useEffect, useState } from "react";

import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";

import { CursorProvider } from "./Walkthrough/contexts/CursorContext";
import { useZoomEffect } from "./Walkthrough/hooks/useZoomEffect";
import AppShowcase from "./Walkthrough/AppShowcase";
import { walkthroughDuration } from "./Root";

export type ScaleConfigs = {
  frame?: number;
  startFrame: number;
  zoomInDuration: number;
  holdDuration: number;
  zoomOutDuration: number;
  fps: number;
  maxScale: number;
};

const Walkthrough = () => {
  const frame = useCurrentFrame();
  const [scaleConfigs, setScaleConfigs] = useState<ScaleConfigs>({
    startFrame: 0,
    zoomInDuration: 10,
    holdDuration: 50,
    zoomOutDuration: 10,
    fps: 30,
    maxScale: 2,
  }); // "frame" is not included as this will execute only once, onMount!
  const scale = useZoomEffect({ ...scaleConfigs, frame });

  const updateScaleConfigs = (configs: ScaleConfigs) => {
    setScaleConfigs((prev) => ({ ...prev, ...configs }));
  };

  useEffect(() => {
    if (frame <= 2) {
      updateScaleConfigs({
        startFrame: 0,
        zoomInDuration: 10,
        holdDuration: 50,
        zoomOutDuration: 10,
        fps: 30,
        maxScale: 2,
      });
    }
  }, [frame, scale]);

  return (
    <CursorProvider>
      <AbsoluteFill
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top right", // Focus the zoom on the top right side
          // transition: `background-color 1s, color 0.1s`,
        }}
      >
        <Sequence durationInFrames={walkthroughDuration}>
          <AppShowcase onScaleChange={updateScaleConfigs} />
        </Sequence>
      </AbsoluteFill>
    </CursorProvider>
  );
};

export default Walkthrough;
