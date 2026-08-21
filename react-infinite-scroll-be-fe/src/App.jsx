import InfiniteScroll from "./components/InfiniteScroll";
import "./App.css";

const URL = "https://dummyjson.com/products";
const PRODUCT_PER_PAGE = 20;

function App() {
  return (
    <div className="infinite-scroll">
      <h1>React Infinite Scroll</h1>
      <InfiniteScroll url={URL} productPerPage={PRODUCT_PER_PAGE} />
    </div>
  );
}

export default App;
