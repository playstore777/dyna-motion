import { AbsoluteFill, Audio, Img, Sequence } from "remotion";

import platformToShare from "./assets/audios/platform_to_share.mp3";
import introductionLow from "./assets/audios/introduction_low.mp3";
import lowDotCom from "./assets/images/low_dot_com_on_sale.png";
import introduction from "./assets/audios/introduction.mp3";
import inspiredBy from "./assets/audios/inspired_by.mp3";
import FadeInText from "./reusableComponents/FadeInText";
import { Inspiration } from "./Intro/Inspiration";
import Oops from "./assets/audios/Ooops.mp3";

const Intro = () => {
  return (
    <AbsoluteFill>
      <Sequence durationInFrames={50}>
        <FadeInText firstLine="Introducing" secondLine="Low.com" />
        <Audio src={introduction} />
      </Sequence>
      <Sequence from={51} durationInFrames={30}>
        <Img pauseWhenLoading src={lowDotCom} style={{ margin: "auto" }} />
        <Audio src={Oops} />
      </Sequence>
      <Sequence from={80} durationInFrames={50}>
        <FadeInText firstLine="Introducing" secondLine="Low" />
        <Audio src={introductionLow} />
      </Sequence>
      <Sequence from={130} durationInFrames={100}>
        <Inspiration />
        <Audio src={inspiredBy} />
      </Sequence>
      <Sequence from={230} durationInFrames={60}>
        <FadeInText
          firstLine="A new platform"
          secondLine="to write your stories"
        />
        <Audio src={platformToShare} />
      </Sequence>
    </AbsoluteFill>
  );
};

export default Intro;
