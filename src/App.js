import './App.css';
import { Routes, Route } from "react-router-dom";
import Forms from './components/Forms';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Forms />} />
        <Route path="/tables" element />
      </Routes>
    </div>
  );
}

export default App;
