import './App.css';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import FlightSearch from './views/FlightSearch/FlightSearch';

function App() {
  return (
    <div>
      <Router basename="/">
        <Routes>
          <Route exact path="/" element={<FlightSearch />} />
          <Route exact path="*" element={<FlightSearch/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
