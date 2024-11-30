import { interpolate, spring } from "remotion";

type UseZoomEffectProps = {
  frame: number;
  startFrame?: number;
  zoomInDuration?: number;
  holdDuration?: number;
  zoomOutDuration?: number;
  fps?: number;
  maxScale?: number;
};
export const useZoomEffect = ({
  frame,
  startFrame = 0,
  zoomInDuration = 10,
  holdDuration = 50,
  zoomOutDuration = 10,
  fps = 30,
  maxScale = 2,
}: UseZoomEffectProps): number => {
  // Calculate total keyframes
  const zoomInEnd = startFrame + zoomInDuration;
  const holdEnd = zoomInEnd + holdDuration;
  const zoomOutEnd = holdEnd + zoomOutDuration;

  // Handle frame ranges properly
  if (frame < startFrame) {
    return 1; // No scaling before startFrame
  }

  // Zoom-in animation
  const zoomInFrame = Math.min(frame - startFrame, zoomInDuration);
  const zoomIn = spring({
    frame: zoomInFrame,
    fps,
    config: { damping: 200 },
  });

  const scaleIn = interpolate(zoomIn, [0, 1], [1, maxScale]);

  // Final scale calculation
  const scale =
    frame <= zoomInEnd
      ? scaleIn // Zoom-in phase
      : frame <= holdEnd
        ? maxScale // Hold at max scale
        : frame <= zoomOutEnd
          ? interpolate(frame, [holdEnd, zoomOutEnd], [maxScale, 1], {
              extrapolateRight: "clamp",
            }) // Smooth zoom-out
          : 1; // Reset to original scale

  return scale;
};
