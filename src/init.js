import i18next from 'i18next';

import initState from './state';
import initWatchers from './watchers';
import handleRssDownloadForm from './controllers/handleRssDownloadForm';
import handleRssFeeds from './controllers/handleRssFeeds';
import handleRssPosts from './controllers/handleRssPosts';
import periodicallyUpdateFeeds from './controllers/periodicallyUpdateFeeds';

import translations from '../assets/translations.json';

export default () => {
  i18next.init({
    lng: 'en',
    resources: translations,
  });

  const state = initState();
  initWatchers(state);
  handleRssDownloadForm(state);
  handleRssFeeds(state);
  handleRssPosts(state);
  periodicallyUpdateFeeds(state);
};
