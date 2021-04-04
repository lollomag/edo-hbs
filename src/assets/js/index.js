import "./polyfill";
import "./lightgallery";

import Header from "../../components/header/header";
import Gallery from "../../components/gallery/gallery";


document.addEventListener('DOMContentLoaded', () => {
  try { new Header().load() } catch (err) { console.error(err) }
  try { new Gallery().load() } catch (err) { console.error(err) }
});