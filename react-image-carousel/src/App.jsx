import ImageSlider from "./components/ImageSlider";
import "./App.css";

import images from "./assets/images.json";

function App() {
  return (
    <div className="app">
      <ImageSlider images={images} />
    </div>
  );
}

export default App;
