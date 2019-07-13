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
  },
  corsproxy: 'https://cors-anywhere.herokuapp.com/',
  updateInterval: 3000,
};

export default store;
