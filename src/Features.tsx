import React, { useEffect, useRef, useState } from "react";

import {
  AbsoluteFill,
  Audio,
  continueRender,
  delayRender,
  Sequence,
  useCurrentFrame,
} from "remotion";

import { useCardContext } from "./Features/CardContext";
import { FakeCursor } from "./Features/FakeCursor";
import { API_RESPONSE } from "./constants";
import { Card } from "./Features/Card";
import {
  cardHeight,
  cardMargin,
  cardsList,
  cardWidth,
} from "./Features/constants";

type SingleCard = {
  title: string;
  imgSrc: string;
  onIdShort?: number;
  removeOnIdShort?: number;
  audioSrc?: string;
  extraFrames?: number;
};

export const Features: React.FC = () => {
  const { numCards, setNumCards, totalDurationInFrames } = useCardContext();
  const [listOfCards, setListOfCards] = useState<SingleCard[]>([]);
  const [handle] = useState(() => delayRender());

  const currentFrame = useCurrentFrame();
  const cursorPositions = useRef<{ x: number; y: number }[]>([]);

  useEffect(() => {
    // Fetch API data dynamically when building the video
    const fetchAPIData = async () => {
      try {
        const tempCards = API_RESPONSE;
        const doneCards = tempCards.map((card: { idShort: number }) => {
          return card.idShort;
        });
        const tempList = cardsList.filter((card) => {
          return (
            (card.removeOnIdShort &&
              !doneCards.includes(card.removeOnIdShort)) ||
            (card.onIdShort && doneCards.includes(card.onIdShort)) ||
            (!card.onIdShort && !card.removeOnIdShort)
          );
        });
        setListOfCards(tempList);
        setNumCards(tempList.length);
      } catch (e) {
        console.error("Error while fetching data from API: ", e);
        throw e;
      } finally {
        continueRender(handle);
      }
    };
    fetchAPIData();
  }, [handle]);

  useEffect(() => {
    setCursorPositions();
  }, [listOfCards]);

  const setCursorPositions = () => {
    const cards = document.querySelector(".cards") as HTMLElement;
    const cardElements = Array.from(cards?.children ?? []);

    if (cardElements.length > 0) {
      cursorPositions.current = cardElements.map((element: Element) => {
        const card = element as HTMLElement;
        return {
          x: card.offsetLeft + cardWidth / 2 + cardMargin,
          y: card.offsetTop + cardHeight / 2,
        };
      });
    }
  };

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "#f0f0f0",
        backgroundColor: "#121212",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
        className="cards" // for cursor positioning purpose!
      >
        {/* Render numCards */}
        {listOfCards.map((card, index) => {
          return (
            <div key={index}>
              <Card
                key={index}
                index={index}
                isHovered={
                  index ===
                  Math.floor(currentFrame / (totalDurationInFrames / numCards))
                } // Change hovered card every second
                title={card.title}
                imgSrc={card.imgSrc}
              />
              {card.audioSrc && (
                <Sequence
                  from={index ? (index * totalDurationInFrames) / numCards : 10}
                  durationInFrames={totalDurationInFrames / numCards}
                >
                  <Audio src={card.audioSrc} />
                </Sequence>
              )}
            </div>
          );
        })}
      </div>

      {/* Cursor movement */}
      {cursorPositions.current.map((pos, index) => {
        const defaultX = index ? cursorPositions.current[index - 1].x : 0;
        let defaultY;
        if (index && defaultX > cursorPositions.current[index].x) {
          defaultY = cursorPositions.current[index - 1].y;
        } else {
          defaultY = index ? cursorPositions.current[index].y : 0;
        }
        return (
          <Sequence
            key={index}
            from={(index * totalDurationInFrames) / numCards}
            durationInFrames={totalDurationInFrames / numCards}
          >
            <FakeCursor
              x={pos.x}
              y={pos.y}
              defaultX={defaultX}
              defaultY={defaultY}
            />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
