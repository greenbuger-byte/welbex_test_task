const Router = require('express');
const infoController = require('../controllers/info.controller');

const router = new Router();
const ROUTES = {
    list: '/info/',
};
router.get(ROUTES.list, infoController.list);

module.exports = router;