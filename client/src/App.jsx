import "./App.css";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./Components/IndexPage";
import LoginPage from "./Components/LoginPage";
import Layout from "./Layout";
import RegisterPage from "./Components/RegisterPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}

export default App;
