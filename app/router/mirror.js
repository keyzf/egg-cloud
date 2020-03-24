/**
 * 一些公共的接口
 */
module.exports = app => {
    const { router, controller } = app;
    router.post('/api/v1/mirror/index', controller.mirror.index.index);
    router.post('/api/v1/mirror/search', controller.mirror.index.search);
};