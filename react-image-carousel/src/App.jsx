import ImageSlider from "./components/ImageSlider";
import "./App.css";

import { Images } from "./assets/images.js";

function App() {
  return (
    <div className="app">
      <ImageSlider images={Images} />
    </div>
  );
}

export default App;
