import TreeViewList from "./components/TreeViewList";
import menus from "./assets/menus.json";
import "./App.css";

function App() {
  return (
    <div className="tree-view-container">
      <TreeViewList list={menus} />
    </div>
  );
}

export default App;
