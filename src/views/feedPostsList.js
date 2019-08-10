const showSpinner = () => {
  const content = `
    <div class='spinner-border text-primary'>
      <span class='sr-only'>Loading...</span>
    </div>
  `;
  const feedsArticles = document.getElementById('articles-list');
  feedsArticles.innerHTML = content;
};

const showPosts = (articles) => {
  const feedsArticles = document.getElementById('articles-list');
  const articlesViews = articles.map(el => `
    <div class='card' data-guid='${el.guid}'>
      <div class='card-body'>
        <h3 class='card-title'>
          <a href='${el.link} target='_blank'>${el.title}</a>
        </h3>
        <button class='btn btn-primary post-desc' data-toggle='modal' data-target='#postDesc'>
          Show post description
        </button>
      </div>
    </div>
  `);
  feedsArticles.innerHTML = articlesViews.join('');
};

export default (state) => {
  const { activeFeedId, feedsState, feeds } = state;
  if (activeFeedId === null) {
    return;
  }
  const { articles } = feeds.find(el => el.id === activeFeedId);
  switch (feedsState) {
    case 'updated':
      showPosts(articles);
      break;
    case 'updating':
      showSpinner();
      break;
    default:
      break;
  }
};
