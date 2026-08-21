import "./App.css";
import ProductList from "./components/ProductList";

const URL = "https://dummyjson.com/products?limit=0";

function App() {
  return <ProductList url={URL} />;
}

export default App;
