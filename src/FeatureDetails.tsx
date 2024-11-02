import React, { useEffect, useState } from "react";

import { AbsoluteFill, Audio, Sequence, useCurrentFrame } from "remotion";

import { cardsList } from "./FeatureDetails/constants";
import Card from "./FeatureDetails/Card";
import { featureDetailsDuration } from "./Root";

type SingleCard = {
  title: string;
  imgSrc: string;
  onIdShort?: number;
  removeOnIdShort?: number;
  audioSrc?: string;
  extraFrames?: number;
  details: {
    topLine: string;
    middleLine: string;
    lastLine: string;
    mainTopic: string;
    indexOfO: number;
  };
};

interface props {
  doneCardIds: number[];
}

export const FeatureDetails: React.FC<props> = ({ doneCardIds }) => {
  const [listOfCards, setListOfCards] = useState<SingleCard[]>([]);

  const currentFrame = useCurrentFrame();

  useEffect(() => {
    const tempList = cardsList.filter((card) => {
      return (
        (card?.removeOnIdShort &&
          !doneCardIds.includes(card?.removeOnIdShort)) ||
        (card?.onIdShort && doneCardIds.includes(card?.onIdShort)) ||
        (!card?.onIdShort && !card.removeOnIdShort)
      );
    });
    setListOfCards(tempList);
  }, []);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "#f0f0f0",
        backgroundColor: "#121212",
      }}
    >
      {listOfCards.map((card, index) => {
        return (
          <React.Fragment key={index}>
            <Sequence
              from={(index * featureDetailsDuration) / listOfCards.length}
              durationInFrames={featureDetailsDuration / listOfCards.length}
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#121212",
              }}
            >
              <Card
                key={index}
                index={index}
                isHighlighted={
                  index ===
                  Math.floor(
                    currentFrame / (featureDetailsDuration / listOfCards.length)
                  )
                } // Change highlighted card every second
                title={card?.title}
                imgSrc={card?.imgSrc}
                details={card?.details}
              />
              {card?.audioSrc && <Audio src={card?.audioSrc} />}
            </Sequence>
          </React.Fragment>
        );
      })}
    </AbsoluteFill>
  );
};
