import validator from 'validator';

export default () => {
  const state = {
    downloadFormState: 'empty',
    downloadFormError: '',
    downloadFormValue: '',
    feeds: [],
    feedsState: 'updated',
    activeFeedId: null,
    activePostGuid: null,
    downloadErrors: [],

    setDownloadFormValue(v) {
      this.downloadFormErrorType = '';
      this.downloadFormValue = v;
      if (this.downloadFormValue === '') {
        this.downloadFormState = 'empty';
        return;
      }
      if (!validator.isURL(this.downloadFormValue)) {
        this.downloadFormState = 'invalidUrl';
        return;
      }
      if (this.feeds.find(({ url }) => url === this.downloadFormValue)) {
        this.downloadFormState = 'alreadyDownloadedUrl';
        return;
      }
      this.downloadFormState = 'valid';
    },

    setDownloadFormState(s, error) {
      this.downloadFormState = s;
      this.downloadFormError = error || '';
    },

    addFeed(feed) {
      const id = this.feeds.length;
      this.feeds = [...this.feeds, { id, ...feed }];
      this.activeFeedId = id;
    },

    addPostsToDownloadedFeed(url, posts) {
      const feed = this.feeds.find(el => el.url === url);
      const { articles: currentPosts } = feed;
      const newPosts = posts.filter(el => !currentPosts.find(x => x.guid === el.guid));
      if (feed.id === this.activeFeedId && newPosts.length > 0) {
        this.feedsState = 'updating';
        setTimeout(() => {
          state.feedsState = 'updated';
        }, 800);
      }
      feed.articles = [...newPosts, ...currentPosts];
    },

    setActiveFeedId(id) {
      this.activeFeedId = id;
    },

    setActivePostGuid(guid) {
      this.activePostGuid = guid;
    },

    addRssErrors(url, error) {
      this.removeRssErrors(url);
      this.downloadErrors = [[url, error], ...this.downloadErrors];
    },

    removeRssErrors(url) {
      this.downloadErrors = this.downloadErrors.filter(([downloadedUrl]) => downloadedUrl !== url);
    },
  };

  return state;
};
