import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import RssDownloadFormModel from './models/rssDownloadForm';
import RssFeeds from './models/rssFeeds';
import rssDownloadFormController from './controllers/rssDownloadForm';
import rssFeedsController from './controllers/rssFeeds';
import rssPostsController from './controllers/rssPosts';
import { periodicallyUpdateFeeds } from './controllers/rssLoadController';

const rssFeedsModel = new RssFeeds();
const rssDownloadFormModel = new RssDownloadFormModel(rssFeedsModel);
rssDownloadFormController(rssDownloadFormModel, rssFeedsModel);
rssFeedsController(rssFeedsModel);
rssPostsController(rssFeedsModel);
periodicallyUpdateFeeds(rssFeedsModel, rssDownloadFormModel);
