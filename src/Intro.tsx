import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { AbsoluteFill, Audio, Img, Sequence } from "remotion";
import { slide } from "@remotion/transitions/slide";

import platformToShare from "./assets/audios/platform_to_share.mp3";
import introductionLow from "./assets/audios/introduction_low.mp3";
import lowDotCom from "./assets/images/low_dot_com_on_sale.png";
import introduction from "./assets/audios/introduction.mp3";
import inspiredBy from "./assets/audios/inspired_by.mp3";
import FadeInText from "./reusableComponents/FadeInText";
import { Inspiration } from "./Intro/Inspiration";
import Oops from "./assets/audios/Ooops.mp3";

interface props {
  isAudioEnabled?: boolean;
}

const Intro: React.FC<Readonly<props>> = ({ isAudioEnabled = true }) => {
  return (
    <AbsoluteFill>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={110}>
          <div
            style={{
              position: "absolute",
              top: "0",
              right: "0",
              width: "100%",
              height: "100%",
              borderRadius: ".3rem",
              borderRight: "1.5rem solid #7F58AF",
              borderTop: "1.5rem solid #7F58AF",
            }}
          />
          <Sequence durationInFrames={50}>
            <FadeInText firstLine="Introducing" secondLine="Low.com" />
            {isAudioEnabled && <Audio src={introduction} />}
          </Sequence>
          <Sequence from={51} durationInFrames={10}>
            <Img pauseWhenLoading src={lowDotCom} style={{ margin: "auto" }} />
            {isAudioEnabled && <Audio src={Oops} />}
          </Sequence>
          <Sequence from={61} durationInFrames={50}>
            <FadeInText firstLine="Introducing" secondLine="Low" />
            {isAudioEnabled && <Audio src={introductionLow} />}
          </Sequence>
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({
            direction: "from-right",
          })}
          timing={linearTiming({ durationInFrames: 5 })}
        />
        <TransitionSeries.Sequence durationInFrames={60}>
          <Inspiration />
          {isAudioEnabled && <Audio src={inspiredBy} />}
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence durationInFrames={60}>
          <FadeInText
            firstLine="A new platform"
            secondLine="to share your stories"
          />
          {isAudioEnabled && <Audio src={platformToShare} />}
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};

export default Intro;
