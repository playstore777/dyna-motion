/**
 * @param {null} props - Unused props
 */

import React, { useEffect, useState } from "react";

import { Sequence, useCurrentFrame } from "remotion";

import { FakeCursor } from "../reusableComponents/fakeCursor/FakeCursor";
import WriteIcon from "../reusableComponents/svgs/WriteIcon";
import BellIcon from "../reusableComponents/svgs/BellIcon";
import Button from "../reusableComponents/button/Button";
import Avatar from "../reusableComponents/avatar/Avatar";
import { useCursor } from "../hooks/useCursor";
import ThemeToggle from "./theme/ThemeToggle";
import classes from "./Header.module.css";
import { userPhoto } from "../constants";
import LowLogo from "../reusableComponents/svgs/LowLogo";

interface props {
  showEditor: boolean;
  setShowEditor: (value: boolean) => void;
  showIsPublish: () => void;
}

const Header: React.FC<Readonly<props>> = ({
  showEditor,
  setShowEditor,
  showIsPublish,
}) => {
  const frame = useCurrentFrame();
  const { cursors, addCursors } = useCursor();

  const [isDarkMode, setIsDarkMode] = useState(false);
  const { currentUser } = {
    currentUser: {
      photoURL: userPhoto,
      displayName: "",
    },
  };
  const { pathname } = { pathname: "" };
  const scrollDirection = "up";

  useEffect(() => {
    const themeSwitch = document.querySelector(
      "#button-container"
    ) as HTMLElement;
    const writeBtn = document.querySelector("#write-story") as HTMLElement;
    addCursors("changeTheme", {
      position: {
        x: themeSwitch?.offsetLeft ? themeSwitch.offsetLeft + 40 : 0,
        y: themeSwitch?.offsetTop ? themeSwitch.offsetTop + 20 : 0,
      },
    });
    addCursors("triggerWrite", {
      position: {
        x: writeBtn?.offsetLeft ? writeBtn.offsetLeft + 40 : 0,
        y: writeBtn?.offsetTop ? writeBtn.offsetTop + 20 : 0,
      },
    });
    addCursors("triggerPublish", {
      position: {
        x: themeSwitch?.offsetLeft ? themeSwitch.offsetLeft + 150 : 0,
        y: themeSwitch?.offsetTop ? themeSwitch.offsetTop + 20 : 0,
      },
    });
  }, []);

  useEffect(() => {
    // reset every single time
    if (frame < 10) {
      setIsDarkMode(false);
    }
  }, [frame]);

  const onMouseOverWriteBtn = (value: boolean) => {
    setShowEditor(value);
  };

  const onMouseOverThemeToggle = (value: boolean) => {
    setIsDarkMode(value ?? true);
  };

  const onMouseOverPublishBtn = () => {
    showIsPublish();
  };

  return (
    <header
      className={`${classes.headerWrapper} ${
        pathname.includes("new") && classes.paddingInlineHeader
      } ${
        scrollDirection === "up" || !scrollDirection
          ? classes.showHeader
          : classes.hideHeader
      }`}
    >
      <div className={classes.left}>
        <div id={classes.logo}>
          <a href="/">
            <LowLogo />
          </a>
          {/** Medium logo used only for testing */}
        </div>
        <div className={classes.searchBar}>
          <input type="text" placeholder="Search" />
        </div>
      </div>
      <div className={classes.right}>
        <ThemeToggle isDarkMode={isDarkMode} />
        {!showEditor && (
          <div
            id="write-story"
            className={classes.postButton}
            onClick={() => onMouseOverWriteBtn(true)}
          >
            <WriteIcon />
            <div className={classes.iconCaption}>Write</div>
          </div>
        )}
        {showEditor && (
          <div className={classes.postButton}>
            <Button
              id="publish-story"
              label="Publish"
              style={{ color: "white", fontWeight: "bold" }}
              onClick={() => onMouseOverWriteBtn(false)}
            />
          </div>
        )}
        <div>
          <BellIcon />
        </div>
        <Avatar
          imgSrc={currentUser?.photoURL?.toString()}
          imgTitle={currentUser?.displayName?.toString()}
        />
      </div>
      {cursors && (
        <Sequence from={12} durationInFrames={40}>
          <FakeCursor
            x={cursors.get("changeTheme")?.position?.x ?? 0}
            y={cursors.get("changeTheme")?.position?.y ?? 0}
            onHover={onMouseOverThemeToggle}
          />
        </Sequence>
      )}
      {cursors && (
        <Sequence from={51} durationInFrames={30}>
          <FakeCursor
            x={cursors.get("triggerWrite")?.position?.x ?? 0}
            y={cursors.get("triggerWrite")?.position?.y ?? 0}
            initialX={cursors.get("changeTheme")?.position?.x ?? 0}
            initialY={cursors.get("changeTheme")?.position?.y ?? 0}
            onHover={onMouseOverWriteBtn}
          />
        </Sequence>
      )}
      {cursors && (
        <Sequence from={160} durationInFrames={30}>
          <FakeCursor
            x={cursors.get("triggerPublish")?.position?.x ?? 0}
            y={cursors.get("triggerPublish")?.position?.y ?? 0}
            initialX={cursors.get("confirmCollapsible")?.position?.x ?? 0}
            initialY={cursors.get("confirmCollapsible")?.position?.y ?? 0}
            onHover={onMouseOverPublishBtn}
          />
        </Sequence>
      )}
    </header>
  );
};

export default Header;
