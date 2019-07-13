const store = {
  rssFeed: {
    value: '',
    isValid: null,
    validationMessage: '',
  },
  addFeedButton: {
    disabled: true,
  },
  feeds: [],
  activeData: {
    feedId: null,
    postId: null,
    hasNewPosts: false,
  },
  downloading: 'completed',
  corsproxy: 'https://cors-anywhere.herokuapp.com/',
  updateInterval: 6000,
};

export default store;
