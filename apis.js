import axios from "axios"
import formatDate from "./src/utils/utils"

export const getAllArticles = () => {
  return axios.get("https://nc-news-z2fk.onrender.com/api/articles").then(({ data }) => {
    data.articles.forEach((article) => {
      article.created_at = formatDate(article.created_at)
    })
    return data
  })
}


export const getArticleById = (id) => {
  return axios.get(`https://nc-news-z2fk.onrender.com/api/articles/${id}`).then(({ data: { article } }) => {
     article.created_at = formatDate(article.created_at);
    return article;
  });
}

export const getCommentsByArticle = (id) => {
  return axios
    .get(`https://nc-news-z2fk.onrender.com/api/articles/${id}/comments`)
    .then(({ data }) => {
    data.comments.forEach((comment) => {
      comment.created_at = formatDate(comment.created_at);
    });
    return data;
    });
}