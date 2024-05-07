import ArticleThumbnail from "./Article-thumbnail"

import { useState } from "react"

function AllArticles() {

const [allArticles, setAllArticles] = useState([])
    


return (
<div className="flex">
    <ArticleThumbnail />
    <ArticleThumbnail />
    <ArticleThumbnail />
</div>
)
    }

export default AllArticles