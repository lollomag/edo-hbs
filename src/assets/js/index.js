import "./polyfill";
import "./lightgallery";

import "../../components/bio-carousel/bio-carousel"
import Header from "../../components/header/header";
import "../../components/gallery/gallery";
import "./validate-form";
import "../../components/gallery/filter";
import "./filterVideo";
import "../../components/modals/modal";

document.addEventListener('DOMContentLoaded', () => {
  try { new Header().load() } catch (err) { console.error(err) }
  // try { new Gallery().load() } catch (err) { console.error(err) }
  // try { new ModalVideo().load() } catch (err) { console.error(err) }
});

