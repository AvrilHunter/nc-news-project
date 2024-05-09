import './App.css'
import { Routes, Route } from "react-router-dom";
import { useState } from 'react';
import AllArticles from "./AllArticles"
import Header from './Header';
import SingleArticle from './SingleArticle';
import { UserProvider } from "../context/UserContext";

function App() {

  const [topic, setTopic] = useState("cooking");

  return (
    <>
      <UserProvider>
        <Header/>
        <Routes>
          <Route path="/" element={<AllArticles topic={topic} setTopic={setTopic} />} />
          <Route path="/articles/:article_id" element={<SingleArticle />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </UserProvider>
    </>
  );
}

export default App
