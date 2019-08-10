export default ({ feeds }) => {
  const feedsViews = feeds.map(feed => (`
    <div class='card' data-id='${feed.id}'>
      <div class='card-body'>
        <h2 class='card-title'>${feed.title}</h2>
        <p class='card-text'>${feed.desc}</p>
      </div>
    </div>
  `));
  const feedsArticles = document.getElementById('feeds-list');
  feedsArticles.innerHTML = feedsViews.join('');
};
