const pool = require("./db");
const select = async (table, rows, page = 1, limit = 10, sort = null) => {
    try{
        const typeOfExpression = {
            eq: '=',
            lt: '<',
            gt: '>',
            like: 'LIKE'
        };
        let query = `SELECT * from ${table}`;
        let where = "";
        const itemMaker = (item) => typeof item === "string" ? `'${item}'` : item;
        if(Object.keys(rows).length){
            where = ' WHERE ';
            Object.entries(rows).forEach( ([row_key, row_value], row_index) => {
                const prefix = row_index > 0 ? ' AND ' : '';
                if(typeof row_value !== 'object') {
                    where += `${prefix} ${row_key} = '${row_value}'`;
                } else {
                    Object.entries(row_value).forEach(([item_key, item_value]) => {
                        where += `${prefix} ${row_key} ${typeOfExpression[item_key] || '='} ${itemMaker(item_value)}`;
                    })
                }
            });
            query += where;
        }
        const count = await pool.query(query);
        if(sort) query += ` ORDER BY ${sort.field} ${sort.sortType} `;
        query += ` LIMIT ${limit} OFFSET ${page*limit-limit}`;
        const result = await pool.query(query);
        return {count: count.rows.length, [table]: result.rows};
    }catch (error){
        console.error(error);
        return { error: error.message }
    }
}

module.exports = select;