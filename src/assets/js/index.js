import "./polyfill";
import "./lightgallery";


import Gallery from "../../components/gallery/gallery";


document.addEventListener('DOMContentLoaded', () => {
  try { new Gallery().load() } catch (err) { console.error(err) }
});