import axios from "axios"

export const getAllArticles = () => {
  return axios.get("https://nc-news-z2fk.onrender.com/api/articles").then(({ data }) => { return data })
}