'use strict';

const { Controller } = require('egg');
const fs = require('fs');
const FileHound = require('filehound');

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

    /**
     * 查询
     */
    async search() {
        const { ctx } = this;
        let { dir, q } = ctx.request.body;
        let basePath = this.config.baseDir + '/app/public/mirror' + dir
        let files = await FileHound.create()
            .paths(basePath)
            .match(`*${q}*`)
            .findSync();
        let dirs = await FileHound.create()
            .paths(basePath)
            .directory()
            .match(`*${q}*`)
            .findSync();
        let list = {
            files: files.map((e) => { return { name: e.slice(basePath.length, e.length) } }),
            dirs: dirs.map((e) => { return { name: e.slice(basePath.length, e.length) } })
        };
        ctx.body = { code: 1, data: list };
    }
}

module.exports = MirrorController;
