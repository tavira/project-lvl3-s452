import { watch } from 'melanke-watchjs';
import validator from 'validator';
import i18next from 'i18next';

import renderDownloadForm from './views/rssDownloadForm';
import renderFeeds from './views/feedList';
import renderFeedPosts from './views/feedPostsList';
import renderPostDescription from './views/postDescription';
import translations from '../assets/translations.json';

export default () => {
  i18next.init({
    lng: 'en',
    resources: translations,
  });

  const state = {
    rssDownloadForm: {
      currentState: 'empty',
      urlValue: '',
      validationMessage: '',

      setUrlValue(v) {
        this.urlValue = v;
        if (this.urlValue === '') {
          this.validationMessage = '';
          this.currentState = 'empty';
          return;
        }
        if (!validator.isURL(this.urlValue)) {
          this.validationMessage = i18next.t('rssValidation.invalid');
          this.currentState = 'invalid';
          return;
        }
        if (state.feeds.feedsList.find(({ url }) => url === this.urlValue)) {
          this.validationMessage = i18next.t('rssValidation.alreadyDownloaded');
          this.currentState = 'invalid';
          return;
        }
        this.validationMessage = '';
        this.currentState = 'valid';
      },

      setValidationMessage(v) {
        this.validationMessage = v;
      },

      setState(s, payload) {
        const actions = {
          invalid: this.setValidationMessage.bind(this),
          'download-error': this.setValidationMessage.bind(this),
        };
        if (actions[s]) {
          actions[s](payload);
        }
        this.currentState = s;
      },
    },

    feeds: {
      currentState: 'updated',
      feedsList: [],
      activeFeedId: null,

      addFeed(feed) {
        const id = this.feedsList.length;
        this.feedsList = [...this.feedsList, { id, ...feed }];
        this.activeFeedId = id;
      },

      addPostsToDownloadedFeed(url, posts) {
        const feed = this.feedsList.find(el => el.url === url);
        const { articles: currentPosts } = feed;
        const newPosts = posts.filter(el => !currentPosts.find(x => x.guid === el.guid));
        if (feed.id === this.activeFeedId && newPosts.length > 0) {
          this.currentState = 'updating';
          setTimeout(() => {
            state.feeds.currentState = 'updated';
          }, 800);
        }
        feed.articles = [...newPosts, ...currentPosts];
      },

      setActiveFeedId(id) {
        this.activeFeedId = id;
      },
    },

    posts: {
      activePostGuid: null,

      setActivePostGuid(guid) {
        this.activePostGuid = guid;
      },
    },
  };

  watch(state.rssDownloadForm, () => {
    renderDownloadForm(state.rssDownloadForm);
  });

  watch(state.feeds, () => {
    renderFeeds(state.feeds.feedsList);
    renderFeedPosts(state.feeds);
  });

  watch(state.posts, () => {
    renderPostDescription(state);
  });

  return state;
};
