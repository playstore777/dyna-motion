import { useEffect, useState } from "react";

import { Composition, continueRender, delayRender } from "remotion";

import {
  CardProvider as FeatureCardProvider,
  useCardContext as useFeatureCardContext,
} from "./Features/CardContext";
import {
  CardProvider as FeatureDetailsCardProvider,
  useCardContext as useFeatureDetailCardContext,
} from "./FeatureDetails/CardContext";
import { videoDimensions } from "./constants";
import Walkthrough from "./Walkthrough";
import Credits from "./Credits";
import { Low } from "./Low";

const fps = 30;

export const introDuration = 220;
export const creditsDuration = 200;
const nestedTransitionDuration = 100;
export const endScreenDuration = 100;
export const fadeInTextDuration = 25;
export const walkthroughDuration = 420;

export const RemotionRoot: React.FC = () => {
  const [handle] = useState(() => delayRender());
  const [data, setData] = useState<number[] | undefined>();

  const { totalDurationInFrames: featureDuration } = useFeatureCardContext();
  const { totalDurationInFrames: featureDetailsDuration } =
    useFeatureDetailCardContext();
  const durationInFrames =
    introDuration +
    fadeInTextDuration +
    featureDuration +
    fadeInTextDuration +
    featureDetailsDuration +
    fadeInTextDuration +
    walkthroughDuration +
    creditsDuration +
    nestedTransitionDuration;

  useEffect(() => {
    const fetchAPIData = async () => {
      try {
        const response = await fetch(
          "https://low-middleware.vercel.app/api/trello-list-data"
        );
        // const tempCards = API_RESPONSE; // dummy placeholder for response
        const tempCards = await response.json();
        const doneCards = tempCards.map((card: { idShort: number }) => {
          return card?.idShort;
        });
        setData(doneCards);
      } catch (e) {
        console.error("Error while fetching data from API: ", e);
        throw e;
      } finally {
        continueRender(handle);
      }
    };

    fetchAPIData();
  }, [handle]);

  return (
    <>
      <Composition
        // You can take the "id" to render a video:
        // npx remotion render src/index.ts <id> out/video.mp4
        id="Low"
        component={Low}
        durationInFrames={durationInFrames}
        fps={fps}
        width={videoDimensions.width}
        height={videoDimensions.height}
        // You can override these props for each render:
        // https://www.remotion.dev/docs/parametrized-rendering
        defaultProps={{
          data: data ?? [],
        }}
      />
      <Composition
        id="Walkthrough"
        component={Walkthrough}
        durationInFrames={walkthroughDuration}
        fps={fps}
        width={videoDimensions.width}
        height={videoDimensions.height}
      />
      <Composition
        id="Credits"
        component={Credits}
        durationInFrames={creditsDuration}
        fps={fps}
        width={videoDimensions.width}
        height={videoDimensions.height}
      />
    </>
  );
};

const RemotionRootWithProvider: React.FC = () => {
  return (
    <FeatureCardProvider>
      <FeatureDetailsCardProvider>
        <RemotionRoot />
      </FeatureDetailsCardProvider>
    </FeatureCardProvider>
  );
};

export default RemotionRootWithProvider;
