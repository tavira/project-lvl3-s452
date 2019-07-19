export default (rssFeedsModel) => {
  const activeFeedId = rssFeedsModel.getActiveFeedId();
  if (activeFeedId === null) {
    return;
  }
  const { articles } = rssFeedsModel.getFeeds().find(el => el.id === activeFeedId);
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
