import ReusableCatOnDemand from "../assets/images/reusable_cat_ondemand.png";
import ReusableOndemandAudio from "../assets/audios/reusable_stories_ondemand.mp3";
import DictionaryAudio from "../assets/audios/dictionary.mp3";
import ReusableAudio from "../assets/audios/reusable stories.mp3";
import DictionaryCat from "../assets/images/dictionary_cat.png";
import DarkModeAudio from "../assets/audios/here_you_get.mp3";
import DarkModeImg from "../assets/images/dark_mode_cat.png";
import ReusableCat from "../assets/images/reusable_cat.png";

export const cardWidth = 350;
export const cardHeight = 500;
export const cardMargin = 20;
export const cardsList = [
  {
    title: "Dark Mode",
    imgSrc: DarkModeImg,
    audioSrc: DarkModeAudio,
  },
  {
    title: "Dictionary",
    imgSrc: DictionaryCat,
    audioSrc: DictionaryAudio,
  },
  {
    removeOnIdShort: 53, // placeholder object for the object with onIdShort: 53, once the ticket is closed this will be replaced with the below object/card with onIdShort: 53
    title: "Reusable Stories",
    imgSrc: ReusableCat,
    audioSrc: ReusableAudio,
  },
  {
    onIdShort: 53, // Once this ticket is closed, this will be displayed instead of the removeOnIdShort: 53 object/card
    title: "Reusable Stories on-demand",
    imgSrc: ReusableCatOnDemand,
    audioSrc: ReusableOndemandAudio,
  },
];
