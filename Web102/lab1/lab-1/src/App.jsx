import "./App.css";
import Calendar from "./components/Calendar";

const App = () => {
  return (
    <div className="App">
      <h1>Trip to Peru</h1>
      <h2>
        This is your PERSONAL planned guided trip to Peru. Do not loose this
        URL.
      </h2>
      <Calendar />
    </div>
  );
};

export default App;
