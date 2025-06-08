import { Hono } from 'hono';
import { incrementPageViews, getPageViewsCount } from '../controllers/visitorController';

const router = new Hono();

router.post('/increment', incrementPageViews);
router.get('/count', getPageViewsCount);

export default router; 