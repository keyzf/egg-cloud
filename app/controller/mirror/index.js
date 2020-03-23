'use strict';

const { Controller } = require('egg');
const fs = require('fs');
/**
 * 
 */
class MirrorController extends Controller {
    /**
     * 获取首页json
     */
    async index() {
        const { ctx } = this;
        let q = ctx.request.body.q || '/';
        const basePath = this.config.baseDir + '/app/public/mirror' + q;
        const arr = await fs.readdirSync(basePath, { withFileTypes: true });
        let list = {
            files: arr.filter((ele) => { return !ele.isDirectory() }),
            dirs: arr.filter((ele) => { return ele.isDirectory() })
        };
        ctx.body = { code: 1, data: list };
    }
}

module.exports = MirrorController;
