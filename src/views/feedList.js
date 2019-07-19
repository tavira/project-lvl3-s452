export default (rssFeedsModel) => {
  const feedList = document.getElementById('feeds-list');
  feedList.innerHTML = '';
  const feeds = rssFeedsModel.getFeeds();
  feeds.forEach((element) => {
    const feed = document.createElement('div');
    feed.setAttribute('data-id', element.id);
    feed.classList.add('card');
    const feedBody = document.createElement('div');
    feedBody.classList.add('card-body');
    const title = document.createElement('h2');
    title.textContent = element.title;
    title.classList.add('card-title');
    feedBody.appendChild(title);
    const desc = document.createElement('p');
    desc.textContent = element.desc;
    desc.classList.add('card-text');
    feedBody.appendChild(desc);
    feed.appendChild(feedBody);
    feedList.appendChild(feed);
  });
  feedList.style.display = 'block';
  feedList.setAttribute('cursor', 'pointer');
};
