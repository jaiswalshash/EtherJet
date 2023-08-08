import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FlightSearch from './views/FlightSearch/FlightSearch';
import { FlightList } from './views/FlightList/FlightList';

function App() {
  localStorage.clear();
  return (
    <div>
      <Router basename="/">
        <Routes>
          <Route path="/flights" element={<FlightList />} />
          <Route path="/" element={<FlightSearch />} />
          <Route path="*" element={<FlightSearch />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
