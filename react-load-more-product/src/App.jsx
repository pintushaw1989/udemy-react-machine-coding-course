import "./App.css";
import LoadMoreProducts from "./components/LoadMoreProducts";

const URL = "https://dummyjson.com/products";
const PRODUCT_PER_PAGE = 20;

function App() {
  return <LoadMoreProducts url={URL} productPerPage={PRODUCT_PER_PAGE} />;
}

export default App;
