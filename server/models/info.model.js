const select = require('./select');

class Info {
    async filter(rows, page = 1, limit = 10, sort = null) {
        try{
            return await select('info', rows, page, limit, sort);
        }catch (error){
            return error;
        }
    }
}

module.exports = new Info();
