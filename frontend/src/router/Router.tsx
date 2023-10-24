import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "../pages/Login"

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Login />} />
        <Route path="/calendar" element={<Login />} />
        <Route path="/mind" element={<Login />} />
        <Route path="/mypage" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}
export default Router
