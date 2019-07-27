const showSpinner = () => {
  const feedsArticles = document.getElementById('articles-list');
  feedsArticles.innerHTML = '';
  const spinner = document.createElement('div');
  spinner.classList.add('spinner-border', 'text-primary');
  const span = document.createElement('span');
  span.classList.add('sr-only');
  span.textContent = 'Loading...';
  spinner.appendChild(span);
  feedsArticles.appendChild(spinner);
};

const showPosts = (feeds) => {
  const { articles } = feeds.feedsList.find(el => el.id === feeds.activeFeedId);
  const feedsArticles = document.getElementById('articles-list');

  feedsArticles.innerHTML = '';
  articles.forEach((el) => {
    const article = document.createElement('div');
    article.classList.add('card');
    article.setAttribute('data-guid', el.guid);

    const articleBody = document.createElement('div');
    articleBody.classList.add('card-body');

    const title = document.createElement('h3');
    title.classList.add('card-title');

    const titleLink = document.createElement('a');
    titleLink.textContent = el.title;
    titleLink.setAttribute('href', el.link);
    titleLink.setAttribute('target', '_blank');

    title.appendChild(titleLink);

    articleBody.appendChild(title);

    const buttonDesc = document.createElement('button');
    buttonDesc.classList.add('btn', 'btn-primary', 'postDesc');
    buttonDesc.setAttribute('data-toggle', 'modal');
    buttonDesc.setAttribute('data-target', '#postDesc');
    buttonDesc.textContent = 'Show post description';

    articleBody.appendChild(buttonDesc);
    article.appendChild(articleBody);
    feedsArticles.appendChild(article);
  });
};

export default (feeds) => {
  const { activeFeedId } = feeds;
  if (activeFeedId === null) {
    return;
  }

  switch (feeds.currentState) {
    case 'updated':
      showPosts(feeds);
      break;
    case 'updating':
      showSpinner();
      break;
    default:
      break;
  }
};
