import "./polyfill";
import "./lightgallery";

import Header from "../../components/header/header";
import Gallery from "../../components/gallery/gallery";
import ModalVideo from "../../components/modals/modal";
import "./validate-form";

document.addEventListener('DOMContentLoaded', () => {
  try { new Header().load() } catch (err) { console.error(err) }
  try { new Gallery().load() } catch (err) { console.error(err) }
  try { new ModalVideo().load() } catch (err) { console.error(err) }
});

