import './App.css'
import { Routes, Route } from "react-router-dom";
import { useState } from 'react';
import AllArticles from "./AllArticles"
import Header from './Header';
import SingleArticle from './SingleArticle';
import { UserProvider } from "../context/UserContext";
import NewArticle from './NewArticle';
import FeError from "./styleFunctionComponents/FeError"

function App() {

  const [topic, setTopic] = useState("cooking");

  return (
    <>
      <UserProvider>
        <Header/>
        <Routes>
          <Route path="/" element={<AllArticles topic={topic} setTopic={setTopic} />} />
          <Route path="/articles/:article_id" element={<SingleArticle />} />
          <Route path="/new-article" element={<NewArticle/>}/>
          <Route path="*" element={<FeError />} />
        </Routes>
      </UserProvider>
    </>
  );
}

export default App
