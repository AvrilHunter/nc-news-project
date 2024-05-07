import './App.css'
import { Routes, Route } from "react-router-dom";

import AllArticles from "./AllArticles"
import Header from './Header';
import SingleArticle from './SingleArticle';


function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<AllArticles />} />
        <Route path= "/articles/:article_id" element={<SingleArticle/>}/>
      </Routes>
      </>
  );
}

export default App
