import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import SingleArticle from "./components/SingleArticle";
import { UserProvider } from "../context/UserContext";
import ArticlePost from "./components/ArticlePost";
import FeError from "./components/FeError";
import LogIn from "./components/LogIn";
import HomePage from "./components/HomePage";

function App() {
  const [topic, setTopic] = useState("");

  return (
    <>
      <UserProvider>
        <Header />
        <Routes>
          <Route
            path="/"
            element={<HomePage topic={topic} setTopic={setTopic} />}
          />
          <Route
            path="/articles"
            element={<HomePage topic={topic} setTopic={setTopic} />}
          />
          <Route path="/articles/:article_id" element={<SingleArticle />} />
          <Route path="/new-article" element={<ArticlePost />} />
          <Route path="*" element={<FeError />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
