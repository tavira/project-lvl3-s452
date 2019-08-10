import i18next from 'i18next';

import initState from './state';
import initWatchers from './watchers';
import rssDownloadFormController from './controllers/rssDownloadFormController';
import rssFeedsController from './controllers/rssFeedsController';
import rssPostsController from './controllers/rssPostsController';
import periodicallyUpdateFeeds from './controllers/rssUpdateController';

import translations from '../assets/translations.json';

export default () => {
  i18next.init({
    lng: 'en',
    resources: translations,
  });

  const state = initState();
  initWatchers(state);
  rssDownloadFormController(state);
  rssFeedsController(state);
  rssPostsController(state);
  periodicallyUpdateFeeds(state);
};
