import axios from "axios"

export const getAllArticles = () => {
  return axios.get("https://nc-news-z2fk.onrender.com/api/articles").then(({ data }) => { return data })
}


export const getArticleById = (id) => {
  return axios.get(`https://nc-news-z2fk.onrender.com/api/articles/${id}`).then(({data:{article}}) => {
    return article;
  });
}