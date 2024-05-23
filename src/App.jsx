import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import AllArticles from "./components/AllArticles";
import Header from "./components/Header";
import SingleArticle from "./components/SingleArticle";
import { UserProvider } from "../context/UserContext";
import ArticlePost from "./components/ArticlePost";
import FeError from "./components/FeError";

function App() {
  const [topic, setTopic] = useState("cooking");

  return (
    <>
      <UserProvider>
        <Header />
        <Routes>
          <Route
            path="/"
            element={<AllArticles topic={topic} setTopic={setTopic} />}
          />
          <Route path="/articles/:article_id" element={<SingleArticle />} />
          <Route path="/new-article" element={<ArticlePost />} />
          <Route path="*" element={<FeError />} />
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
