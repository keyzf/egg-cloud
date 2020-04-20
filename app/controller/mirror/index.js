'use strict';

const { Controller } = require('egg');
const fs = require('fs');
const path = require('path');
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
        const basePath = this.config.baseDir + '/mirror' + q;
        const arr = await fs.readdirSync(basePath, { withFileTypes: true });
        let list = {
            files: arr.filter((ele) => { return !ele.isDirectory() }),
            dirs: arr.filter((ele) => { return ele.isDirectory() })
        };
        ctx.body = { code: 1, data: list };
    }

    /**
     * 下载
     */
    async download() {
        const { ctx } = this;
        const info = ctx.request.query;
        const filePath = path.resolve(this.config.baseDir + '/mirror' + info.path, info.name);
        ctx.attachment(info.name);
        ctx.set('Content-Type', 'application/octet-stream');
        ctx.body = fs.createReadStream(filePath);

    }

    /**
     * 查询
     */
    async search() {
        const { ctx } = this;
        let { dir, q } = ctx.request.body;
        let basePath = this.config.baseDir + '/mirror' + dir
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
