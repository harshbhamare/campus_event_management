import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/signup";  // <-- Capital S here

function App() {
  return (
      <Routes>
        <Route path="/signup" element={<Signup />} />
      </Routes>
  );
}

export default App;
