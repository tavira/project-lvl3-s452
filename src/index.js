import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import rssvalidator from './rssValidator';
import rssdownloader from './rssDownloader';
import rssView from './rssView';
import rssUpdater from './rssUpdater';

rssvalidator();
rssdownloader();
rssView();
rssUpdater();
