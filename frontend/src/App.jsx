import Signup from "./pages/Signup";
import Login from "./pages/Login"
import Home from "./pages/Home"
import {Routes, Route } from "react-router";
import { useSelector, useDispatch } from 'react-redux'
import { checkAuth } from "./authSlice";
import { useEffect } from "react";
function App() {
  const {isAuthenticated} = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  useEffect(() => {
     dispatch(checkAuth())
  }, [isAuthenticated]);

  return (
    <>
     <Routes>
      <Route path="/" element={<Home></Home>} >home</Route>
      <Route path="/signup" element={<Signup></Signup>} >signup</Route>
      <Route path="/login" element={<Login></Login>} >login</Route>
     </Routes>

    </>
  )
}

export default App
