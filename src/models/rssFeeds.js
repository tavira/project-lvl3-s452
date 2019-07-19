import { watch } from 'melanke-watchjs';
import renderFeeds from '../views/feedList';
import renderFeedPosts from '../views/feedPostsList';
import renderPostDescription from '../views/postDescription';

export default class RssFeeds {
  constructor() {
    this.feeds = [];
    this.activeFeedId = null;
    this.activePostGuid = null;

    watch(this, 'feeds', () => {
      renderFeeds(this);
      renderFeedPosts(this);
    });

    watch(this, 'activeFeedId', () => {
      renderFeedPosts(this);
    });

    watch(this, 'activePostGuid', () => {
      const { articles } = this.feeds.find(el => el.id === this.activeFeedId);
      const currentArticle = articles.find(el => el.guid === this.activePostGuid);
      renderPostDescription(currentArticle);
    });
  }

  isAlreadyDownloaded(url) {
    const urls = this.feeds.map(item => item.url);
    return urls.includes(url);
  }

  addFeed(feed) {
    const id = this.feeds.length;
    this.feeds = [...this.feeds, { id, ...feed }];
    this.activeFeedId = id;
  }

  addPostsToDownloadedFeed(url, posts) {
    const feed = this.feeds.find(el => el.url === url);
    const { articles: currentPosts } = feed;
    const newPosts = posts.filter(el => !currentPosts.find(x => x.guid === el.guid));
    feed.articles = [...newPosts, ...currentPosts];
  }

  getFeeds() {
    return this.feeds;
  }

  getActiveFeedId() {
    return this.activeFeedId;
  }

  setActiveFeedId(id) {
    this.activeFeedId = id;
  }

  setActivePostGuid(guid) {
    this.activePostGuid = guid;
  }
}
