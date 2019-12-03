/**
 * transfer-files-webpack-plugin module.
 * @module transfer-files-webpack-plugin
 * @see doc https://github.com/Ipxxiao/transfer-files-webpack-plugin/tree/master/docs
 */

const fs = require('fs');
const path = require('path');
const Client = require('ssh2').Client;
const http = require('http');
const webpack = require('webpack');

const compiler = new webpack.Compiler();
const config = {
    server: {
        host: 'locahost',
        port: 443,
        username: '',
        password: '',
    },
    assets: {
        filename: 'build.js',
        dir: 'assets/scripts',
    },
    remotePrefix: 'www',
};

class TransferFilesWebpackPlugin {
    constructor(transferConfig) {
        this.transferConfig = transferConfig;
    }
    apply(compiler) {
        const me = this;
        compiler.plugin('done', () => {
            me.init(); // transfer 'build.js' files to server
        });
    }
    init() {
        const me = this;
        const conn = new Client();
        const _transferFile = (fileStream, sftp, remotePath) => { // 传输文件
            const writeStream = sftp.createWriteStream(remotePath);

            writeStream.on('close', () => {
                console.log('- file transferred succesfully to', remotePath);
            });

            writeStream.on('end', () => {
                conn.close();
            });

            writeStream.on('error', (err) => {
                console.log('sftp put err:', err);
            });

            fileStream.pipe(writeStream);
        };

        let filePaths = me.getFilePaths();

        if (filePaths.length) {
            for (let idx in filePaths) {
                let item = filePaths[idx];

                me.connectServer(conn).then(sftp => {
                    // 创建目录需要用"/"的路径，上传文件路径也需要统一用"/"
                    me.mkdirRemote(sftp, item.remoteDir).then((sftp) => { // 创建远端目录
                        me.getFile(item.httpPath).then((fileStream) => { // 获取http文件
                            _transferFile(fileStream, sftp, item.remotePath); // 传输文件
                        }).catch(err => { // 获取http文件失败
                            let host = err.address + ':' + err.port;

                            if (item.httpPath.indexOf(host) >= 0) { // 本地项目未运行
                                let readStream = fs.createReadStream(item.localPath);
                                _transferFile(readStream, sftp, item.remotePath); // 传输本地文件
                            } else {
                                console.log('get file err:', err);
                            }
                        });
                    }).catch(err => {
                        console.log('sftp mkdir err:', err);
                    });
                }).catch(err => {
                    console.log('sftp connect err:', err);
                });
            }
        }
    }
    connectServer(conn) { // 连接服务器
        return new Promise((resolve, reject) => {
            conn.on('ready', () => {
                conn.sftp((err, sftp) => { // stfp 连接
                    if (err) {
                        reject(err);
                    }
                    resolve(sftp);

                });
            }).on('error', (err) => {
                reject(err);
            }).connect(config.server);
        });
    }
    getFilePaths() { // 获取文件路径
        let me = this;
        let transferConfig = me.transferConfig;
        let apppath = transferConfig.currentProject;
        let list = transferConfig.list[apppath];
        let len = list.length;
        let devServer = transferConfig.devServer;
        let paths = [];

        for (let i = 0; i < len; i++) {
            let item = list[i];

            if (item.ftp) {
                let filename = config.assets.filename;
                let fileDir = config.assets.dir;
                let itemDir = `${apppath}/${item.name}/${fileDir}`;
                let remoteDir = `${config.remotePrefix}/${itemDir}`;
                let httpPath = `http://${devServer.host}:${devServer.port}/${itemDir}/${filename}`;
                let localPath = `${__dirname}/../${itemDir}/${filename}`;
                let remotePath = `${remoteDir}/${filename}`;

                paths.push({
                    remoteDir,
                    httpPath,
                    localPath,
                    remotePath
                });
            }
        }

        return paths;
    }
    getFile(fileUrl) { // 获取文件
        return new Promise((resolve, reject) => {
            http.get(fileUrl, (res) => {
                resolve(res);
            }).on('error', (e) => {
                reject(e);
            });
        });
    }
    mkdirRemote(sftp, dir) { // 创建远端目录
        return new Promise((resolve, reject) => {
            let tokens = dir.split(/\//g);
            let p = '';

            let mkdir = () => {
                let token = tokens.shift();

                if (!token && !tokens.length) {
                    resolve(sftp);
                    return false;
                }
                token += '/';
                p = p + token;
                sftp.mkdir(p, (err) => {
                    if (err && err.code !== 4) {
                        reject(err);
                    }
                    mkdir();
                });
            };
            return mkdir();
        });
    }
}

module.exports = TransferFilesWebpackPlugin;