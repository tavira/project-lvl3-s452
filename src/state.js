import validator from 'validator';

export default () => {
  const state = {
    downloadFormState: 'empty',
    downloadFormValue: '',
    downloadFormErrorType: '',
    feeds: [],
    feedsState: 'updated',
    activeFeedId: null,
    activePostGuid: null,

    setDownloadFormValue(v) {
      this.downloadFormErrorType = '';
      this.downloadFormValue = v;
      if (this.downloadFormValue === '') {
        this.downloadFormState = 'empty';
        return;
      }
      if (!validator.isURL(this.downloadFormValue)) {
        this.downloadFormState = 'invalid';
        this.downloadFormErrorType = 'invalidUrl';
        return;
      }
      if (this.feeds.find(({ url }) => url === this.downloadFormValue)) {
        this.downloadFormState = 'invalid';
        this.downloadFormErrorType = 'alreadyDownloadedUrl';
        return;
      }
      this.downloadFormState = 'valid';
    },

    setDownloadFormState(s, error) {
      this.downloadFormState = s;
      this.downloadFormErrorType = error || '';
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
  };

  return state;
};
