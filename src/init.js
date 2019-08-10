import i18next from 'i18next';

import initState from './state';
import initWatchers from './watchers';
import handleRssDownloadForm from './handlers/handleRssDownloadForm';
import handleRssFeeds from './handlers/handleRssFeeds';
import handleRssPosts from './handlers/handleRssPosts';
import periodicallyUpdateFeeds from './handlers/periodicallyUpdateFeeds';

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
