import { useEffect, useRef, useState } from "react";

import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
} from "remotion";

import JonnyBurger from "./assets/images/jonny-burger.png";
import JeffDelaney from "./assets/images/jeff-delaney.png";
import Oops from "./assets/audios/Ooops.mp3";
import HackedText from "./reusableComponents/HackedText";
import { FakeCursor } from "./FeatureDetails/FakeCursor";
import { videoDimensions } from "./constants";
import DisplayKey from "./Credits/DisplayKey";

const START_FRAME = 40;

const Credits: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = spring({
    frame: frame - START_FRAME,
    fps: 30,
    config: {
      stiffness: 50,
    },
  });
  const [showIt, setShowIt] = useState(false); // yes, I am bad at naming
  const [startFrame, setStartFrame] = useState<number | null>(null);
  const moveRight = interpolate(
    progress,
    [0, 1],
    showIt ? [-20.5, 0] : [-20.5, -20.5]
  );

  useEffect(() => {
    if (frame < START_FRAME) {
      setStartFrame(null);
    }
  }, [frame]);

  const jhonnyRef = useRef<{ hackText: () => void } | null>(null);
  const jeffRef = useRef<{ hackText: () => void } | null>(null);

  const btnHandler = () => {
    jhonnyRef.current && jhonnyRef.current.hackText();
    jeffRef.current && jeffRef.current.hackText();
  };

  const onCursorHover = () => {
    setStartFrame(frame);
    setShowIt(true);
  };

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Audio src={Oops} />
      <h1
        style={{
          fontSize: "5rem",
        }}
      >
        Special Thanks to
      </h1>
      <section
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Img width={350} src={JonnyBurger} />
        <HackedText
          key="Jonny Burger"
          ref={jhonnyRef}
          text="Ringo Danyan"
          listOfText={["Ringo Danyan", "Jonny Burger"]}
        />
      </section>
      <section
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Img width={350} src={JeffDelaney} />
        <HackedText
          key="Jeff Delaney"
          ref={jeffRef}
          text="Ringo Danyan"
          listOfText={["Ringo Danyan", "Jeff Delaney"]}
        />
      </section>
      <Sequence from={START_FRAME} durationInFrames={40}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: moveRight + "%",
            display: "flex",
            alignItems: "center",
            backgroundColor: "yellow",
            color: "black",
            borderRadius: "1rem 1rem",
            paddingBlock: "4rem",
            paddingInline: "1rem",
          }}
        >
          <div
            style={{
              textAlign: "center",
              writingMode: "vertical-lr",
              // transform: "rotate(270deg)",
              fontSize: "1.8rem",
              fontWeight: "bold",
            }}
          >
            Report a bug
          </div>
          <div
            style={{
              fontSize: "1.7rem",
            }}
          >
            <p>Any problem, just refresh the page</p>
            <p>Still there? maybe FIY?</p>
          </div>
        </div>
        <FakeCursor
          x={videoDimensions.width - 20}
          y={(videoDimensions.height + 100) / 2}
          onHover={onCursorHover}
        />
      </Sequence>
      {startFrame && (
        <>
          <Sequence from={startFrame + 40} durationInFrames={10}>
            <DisplayKey keyname="CTRL" />
          </Sequence>
          <Sequence from={startFrame + 50} durationInFrames={10}>
            <DisplayKey keyname="CTRL SHIFT" />
          </Sequence>
          <Sequence from={startFrame + 60} durationInFrames={10}>
            <DisplayKey keyname="CTRL SHIFT MEOW" onEnd={btnHandler} />
          </Sequence>
        </>
      )}
    </AbsoluteFill>
  );
};

export default Credits;
