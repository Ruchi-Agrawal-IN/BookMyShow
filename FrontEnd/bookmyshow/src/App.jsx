import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./stylesheets/custom.css";
import "./stylesheets/alignments.css";
import "./stylesheets/form-elements.css";
import "./stylesheets/sizes.css";
import "./stylesheets/theme.css";
import ProtectedRoute from "./components/ProtectedRoute";
import Admin from "./pages/admin";
import TheaterForMovie from "./pages/TheatresForMovie";
function App() {
  return (
    <>
      <h1> BMS Application</h1>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          {/* <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} /> */}
          <Route
            path="/movie/:id"
            element={
              <ProtectedRoute>
                <TheaterForMovie />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
