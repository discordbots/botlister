const { parse } = require('url');

class Https {
    constructor(authorization) {
        this.nodeHttp = require('https');
        this.defaultHeaders = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'User-Agent': `Botlister (https://github.com/discordbots/botlister, ${require('../../package.json').version})`
        }
    }
    
    request(options, postData) {
        return new Promise((resolve, reject) => {
            const request = this.nodeHttp.request(options, (response) => {
                if (response.statusCode < 200 || response.statusCode >= 300) return reject(response.statusMessage || `Status ${response.statusCode}`);
                let body = '';
                response.on('data', (chunk) => body += chunk);
                response.on('end', () => resolve(body));
            }).on('error', reject);
            if (postData) request.write(JSON.stringify(postData));
            request.end();
        });
    } 

    async delete({ url, authorization, options = {} }) {
        const { hostname, path } = parse(url);
        let headers = { ...this.defaultHeaders };
        if (authorization) headers.Authorization = authorization;
        return await this.request({
            method: 'DELETE',
            headers,
            hostname,
            path
        });
    }

    async post({ url, data = {}, authorization, options = { put: null } }) {
        const { hostname, path } = parse(url);
        let headers = { ...this.defaultHeaders };
        if (authorization) headers.Authorization = authorization;
        
        return await this.request({
            method: options.put ? 'PUT' : 'POST',
            headers,
            hostname,
            path
        }, data);
    }

    async get({ url, authorization, options = { } }) {
        const { hostname, path } = parse(url);
        let headers = { ...this.defaultHeaders };
        if (authorization) headers.Authorization = authorization;
  
        return await this.request({
            method: 'GET',
            headers,
            hostname,
            path,
            ...options
        });
   };

    async getJSON({ url, authorization, options = { } }) {
        const { hostname, path } = parse(url);
        let headers = { ...this.defaultHeaders };
        if (authorization) headers.Authorization = authorization;

        const response = await this.request({
            method: 'GET',
            headers,
            hostname,
            path,
            ...options
        });
        return JSON.parse(response) || response;
   };
};

module.exports = Https;