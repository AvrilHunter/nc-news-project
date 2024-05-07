import './App.css'
import { Routes, Route } from "react-router-dom";

import AllArticles from "./AllArticles"
import Header from './Header';


function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<AllArticles/>}/>
      </Routes>
      </>
  );
}

export default App
