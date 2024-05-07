function CommentCard({comment}) {
    const {
      votes, created_at, author, body
    } = comment
  return (
    <section className="comment-card">
      <p>{body}</p>
      <p>Author: {author}</p>
      <p>Votes: {votes}</p>
      <p>Date posted: {created_at}</p>
    </section>
  );
}

export default CommentCard;
