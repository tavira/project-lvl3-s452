import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import appState from './state';
import initWatchers from './watchers';
import rssDownloadFormController from './controllers/rssDownloadFormController';
import rssFeedsController from './controllers/rssFeedsController';
import rssPostsController from './controllers/rssPostsController';
import periodicallyUpdateFeeds from './controllers/rssUpdateController';

const state = appState();
initWatchers(state);
rssDownloadFormController(state);
rssFeedsController(state);
rssPostsController(state);
periodicallyUpdateFeeds(state);
