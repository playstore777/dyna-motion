import BlindnessAudio from "../assets/audios/no_more_blindness.mp3";
import SavesTimeAudio from "../assets/audios/saves_your_time.mp3";
import WriteOnceAudio from "../assets/audios/write_only_once.mp3";
import Blindness from "../assets/images/blindness.png";
import Enchating from "../assets/images/enchanting.png";
import Brewing from "../assets/images/brewing.png";

export const cardWidth = 800;
export const cardHeight = 700;
export const cardMargin = 20;
export const cardPadding = 30;
export const cardsList = [
  {
    title: "Saves you from getting blind",
    imgSrc: Blindness,
    audioSrc: BlindnessAudio,
    details: {
      topLine: "No",
      middleLine: "More",
      lastLine: "Blindness!",
      mainTopic: "Dark Mode!",
      indexOfO: 1, // 0 (zero) based index
    },
  },
  {
    title: "Saves your time as a Reader",
    imgSrc: Enchating,
    audioSrc: SavesTimeAudio,
    details: {
      topLine: "Saves",
      middleLine: "Your",
      lastLine: "Time!",
      mainTopic: "Dictionary!",
      indexOfO: 1, // 0 (zero) based index
    },
  },
  {
    removeOnIdShort: 12, // placeholder object for the object with onIdShort: 12, once the ticket is closed this will be replaced with the below object/card with onIdShort: 12
    title: "Saves your time as a Writer",
    imgSrc: Brewing,
    audioSrc: WriteOnceAudio,
    details: {
      topLine: "Write",
      middleLine: "Only",
      lastLine: "Once!",
      mainTopic: "Reusability!",
      indexOfO: 0, // 0 (zero) based index
    },
  },
  {
    onIdShort: 12, // Once this ticket is closed, this will be displayed instead of the removeOnIdShort: 12 object/card
    title: "Saves your time as a Writer",
    imgSrc: Brewing,
    audioSrc: WriteOnceAudio,
    details: {
      topLine: "Write",
      middleLine: "Only",
      lastLine: "Once!",
      mainTopic: "Reusability!",
      indexOfO: 0, // 0 (zero) based index
    },
  },
];
