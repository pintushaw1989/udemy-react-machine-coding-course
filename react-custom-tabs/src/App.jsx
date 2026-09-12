import Tabs from "./components/Tabs";
import { profileTabs, helpTabs } from "./data/tabs-data";

function App() {
  return (
    <div>
      <h1>My App</h1>
      <Tabs tabs={profileTabs} defaultActiveId="activity" />
      <Tabs tabs={helpTabs} />
    </div>
  );
}

export default App;
