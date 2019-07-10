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
};

export default store;
