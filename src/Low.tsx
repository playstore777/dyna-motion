import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { Audio, AbsoluteFill } from "remotion";

import { Features } from "./Features";
import Intro from "./Intro";
import { FeatureDetails } from "./FeatureDetails";
import {
  creditsDuration,
  endScreenDuration,
  fadeInTextDuration,
  introDuration,
  walkthroughDuration,
} from "./Root";
import { useCardContext as useFeatureCardContext } from "./Features/CardContext";
import { useCardContext as useFeatureDetailCardContext } from "./FeatureDetails/CardContext";
import Credits from "./Credits";
import EndScreen from "./EndScreen";
import vinyl from "./assets/audios/vinyl-funk-166763.mp3";
import FadeInText from "./reusableComponents/FadeInText";
import Walkthrough from "./Walkthrough";
// #region these two audios are really good!
// import leva from "./assets/audios/leva-eternity-149473.mp3";
// import we from "./assets/audios/we-made-it-promo-indie-rock-190174.mp3";
// #endregion

type props = {
  data: number[];
};

export const Low: React.FC<props> = ({ data }) => {
  const { totalDurationInFrames: featureDuration } = useFeatureCardContext();
  const { totalDurationInFrames: featureDetailsDuration } =
    useFeatureDetailCardContext();

  // const mainAudioStartFrame = 0;
  // const altAudioStartFrame = 560; // Frame where alternate audio starts
  // const altAudioEndFrame = 980; // Frame where alternate audio ends

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {/* <Audio
        src={vinyl}
        volume={0.15}
        startFrom={mainAudioStartFrame}
        endAt={altAudioStartFrame} // Stop main audio temporarily
      /> */}

      {/* Alternate Audio */}
      {/* {altAudioStartFrame && (
        <Sequence
          from={altAudioStartFrame}
          durationInFrames={altAudioEndFrame - altAudioStartFrame}
        >
          <Audio src={moonMen} volume={0.55} />
        </Sequence>
      )} */}
      <Audio volume={0.15} src={vinyl} />
      <TransitionSeries>
        {/* Intro */}
        <TransitionSeries.Sequence durationInFrames={introDuration}>
          <div
            style={{
              position: "absolute",
              bottom: "0",
              left: "0",
              width: "100%",
              height: "100%",
              borderRadius: ".3rem",
              borderBottom: "1.5rem solid #64C5EB", // Rigth border is inside the Intro Component!!
              borderLeft: "1.5rem solid #64C5EB", // Rigth border is inside the Intro Component!!
            }}
          />
          <Intro />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({
            direction: "from-bottom",
          })}
          timing={linearTiming({ durationInFrames: 5 })}
        />
        <TransitionSeries.Sequence durationInFrames={fadeInTextDuration}>
          <FadeInText isFast firstLine="You" secondLine="get" />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({
            direction: "from-bottom",
          })}
          timing={linearTiming({ durationInFrames: 5 })}
        />
        {/* Features */}
        <TransitionSeries.Sequence durationInFrames={featureDuration}>
          <div
            style={{
              position: "absolute",
              left: "0",
              bottom: "0",
              height: "100%",
              width: "100%",
              borderRadius: ".3rem",
              borderLeft: "1.5rem solid #E84D8A",
              borderBottom: "1.5rem solid #E84D8A",
              zIndex: "99",
            }}
          />
          <Features doneCardIds={data} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({
            direction: "from-left",
          })}
          timing={linearTiming({ durationInFrames: 10 })}
        />
        <TransitionSeries.Sequence durationInFrames={fadeInTextDuration}>
          <FadeInText isFast firstLine="But, " secondLine="Why?" />
        </TransitionSeries.Sequence>
        {/* FeatureDetails */}
        <TransitionSeries.Sequence durationInFrames={featureDetailsDuration}>
          <div
            style={{
              position: "absolute",
              top: "0",
              right: "0",
              width: "100%",
              height: "100%",
              borderRadius: ".3rem",
              borderTop: "1.5rem solid #FEB326",
              borderRight: "1.5rem solid #FEB326",
              zIndex: "99999",
            }}
          />
          <FeatureDetails doneCardIds={data} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({
            direction: "from-top",
          })}
          timing={linearTiming({ durationInFrames: 10 })}
        />

        <TransitionSeries.Sequence durationInFrames={fadeInTextDuration}>
          <FadeInText isFast firstLine="Nice, " secondLine="How?" />
        </TransitionSeries.Sequence>
        {/* Walkthrough */}
        <TransitionSeries.Sequence durationInFrames={walkthroughDuration}>
          <Walkthrough />
        </TransitionSeries.Sequence>

        {/* Nested transitions */}
        <TransitionSeries.Sequence durationInFrames={70}>
          <TransitionSeries>
            <TransitionSeries.Sequence durationInFrames={70}>
              <Walkthrough />
            </TransitionSeries.Sequence>

            <TransitionSeries.Transition
              presentation={slide()}
              timing={linearTiming({ durationInFrames: 40 })}
            />
            <TransitionSeries.Sequence durationInFrames={70}>
              <FeatureDetails doneCardIds={data} isAudioEnabled={false} />
            </TransitionSeries.Sequence>
          </TransitionSeries>
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({
            direction: "from-top",
          })}
          timing={linearTiming({ durationInFrames: 40 })}
        />
        <TransitionSeries.Sequence durationInFrames={70}>
          <TransitionSeries>
            <TransitionSeries.Sequence durationInFrames={70}>
              <Features doneCardIds={data} isAudioEnabled={false} />
            </TransitionSeries.Sequence>
            <TransitionSeries.Transition
              presentation={slide()}
              timing={linearTiming({ durationInFrames: 40 })}
            />
            <TransitionSeries.Sequence durationInFrames={90}>
              <Intro isAudioEnabled={false} />
            </TransitionSeries.Sequence>
          </TransitionSeries>
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide()}
          timing={linearTiming({ durationInFrames: 40 })}
        />

        {/* EndScreen */}
        <TransitionSeries.Sequence durationInFrames={endScreenDuration}>
          <EndScreen />
        </TransitionSeries.Sequence>

        {/* Credits */}
        <TransitionSeries.Sequence durationInFrames={creditsDuration}>
          <Credits />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
