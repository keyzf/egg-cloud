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
        let basePath = this.config.baseDir + '/app/public/mirror' + q;
        const arr = await fs.readdirSync(basePath);
        let list = {
            files: [],
            dirs: []
        };
        const prom = await arr.map(async function (ele) {
            if (await fs.statSync(basePath + ele).isDirectory()) {
                list.dirs.push(ele);
            } else {
                list.files.push(ele);
            }
        });
        Promise.all(prom).then(() => {
            ctx.body = { code: 1, data: list };
        }).catch((err) => {
            ctx.logger.error(err);
            ctx.body = { code: 0 }
        })
    }
}

module.exports = MirrorController;
