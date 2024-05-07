function ArticleThumbnail() {
  return (
    <div className="articleThumbnail">
      <img className = "articleImage"
        src="https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?w=700&h=700"
        alt="image tag"
      />
      <h2 >Running a Node App</h2>
      <p>
        This is part two of a series on how to get up and running with Systemd
        and Node.js. This part dives deeper into how to successfully run your
        app with systemd long-term, and how to set it up in a production
        environment.
      </p>
      <p>jessjelly</p>
          <p>coding</p>
          <button className="buttonDesign">Button here</button>
    </div>
  );
}

export default ArticleThumbnail;
