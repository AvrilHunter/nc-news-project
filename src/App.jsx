import './App.css'
import { Routes, Route } from "react-router-dom";

import AllArticles from "./AllArticles"
import Header from './Header';
import SingleArticle from './SingleArticle';
import Error from "./Error"
import { UserProvider } from "../context/UserContext";

function App() {
  return (
    <>
      <UserProvider>
        <Header />
        <Routes>
          <Route path="/" element={<AllArticles />} />
          <Route path="/articles/:article_id" element={<SingleArticle />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </UserProvider>
    </>
  );
}

export default App
