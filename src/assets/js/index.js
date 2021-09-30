import "./polyfill";
import "./lightgallery";
import "./homepage";
import "./about";
import "./cinema-main-video";
import "./validate-form";
import "./filterVideo";

import "../../components/header/header";
import "../../components/gallery/filter";
import "../../components/modals/modal";

window.addEventListener("DOMContentLoaded", () => {
  
  try {
    const player = new Plyr('#player');
  } catch (error) {
    // console.error(error);
    // console.clear()
    // expected output: ReferenceError: nonExistentFunction is not defined
    // Note - error messages will vary depending on browser
  }
});