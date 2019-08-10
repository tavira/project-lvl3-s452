import validator from 'validator';

export default () => {
  const state = {
    downloadFormState: 'empty',
    downloadFormValue: '',
    feeds: [],
    feedsState: 'updated',
    activeFeedId: null,
    activePostGuid: null,

    setDownloadFormValue(v) {
      this.downloadFormValue = v;
      if (this.downloadFormValue === '') {
        this.downloadFormMessage = '';
        this.downloadFormState = 'empty';
        return;
      }
      if (!validator.isURL(this.downloadFormValue)) {
        this.downloadFormState = 'invalid-url';
        return;
      }
      if (this.feeds.find(({ url }) => url === this.downloadFormValue)) {
        this.downloadFormState = 'already-downloaded-url';
        return;
      }
      this.downloadFormMessage = '';
      this.downloadFormState = 'valid';
    },

    setDownloadFormMessage(v) {
      this.downloadFormMessage = v;
    },

    setDownloadFormState(s, payload) {
      const actions = {
        invalid: this.setDownloadFormMessage.bind(this),
        'download-error': this.setDownloadFormMessage.bind(this),
      };
      if (actions[s]) {
        actions[s](payload);
      }
      this.downloadFormState = s;
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
