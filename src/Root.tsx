import { useEffect, useState } from "react";

import { Composition, continueRender, delayRender } from "remotion";

import { CardProvider, useCardContext } from "./Features/CardContext";
import { videoDimensions } from "./constants";
import { Low } from "./Low";

const fps = 30;
const introDuration = 291;
export const featureDetailsDuration = 300;

export const RemotionRoot: React.FC = () => {
  const [handle] = useState(() => delayRender());
  const [data, setData] = useState<number[] | undefined>();

  const { totalDurationInFrames } = useCardContext();
  const durationInFrames =
    introDuration + totalDurationInFrames + featureDetailsDuration;

  useEffect(() => {
    const fetchAPIData = async () => {
      try {
        const response = await fetch(
          "https://low-middleware.vercel.app/api/trello-list-data"
        );
        const tempCards = await response.json(); // dummy placeholder for response
        // const tempCards = API_RESPONSE; // dummy placeholder for response
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
      {data && (
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
            data,
          }}
        />
      )}
    </>
  );
};

const RemotionRootWithProvider: React.FC = () => {
  return (
    <CardProvider>
      <RemotionRoot />
    </CardProvider>
  );
};

export default RemotionRootWithProvider;
