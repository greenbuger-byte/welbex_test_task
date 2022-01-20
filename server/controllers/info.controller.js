const info = require("../models/info.model");

function fieldDecoded (field) {
    const [key, exp, val] =  field.split(/_/g);
    const typedValue = key === 'title' ? String(val) : Number(val);
    return (exp !== 'eq') ? {[key]: {[exp]: typedValue}} : { [key] : typedValue };
}

function sortDecoded (sort) {
    const [field, type] = sort.split(/_/g);
    const sortType = type.toUpperCase();
    return { field, sortType };
}

class InfoController {
   async list(req, res){
       try{
           const { rows, page, limit, sort } = req.query;
           let fields = {};
           if(rows) {
               if(Array.isArray(rows)){
                   for(let row of rows){
                       fields = {...fields, ...fieldDecoded(row)};
                   }
               }else fields = fieldDecoded(rows);
           }
           const filter = await info.filter(fields, page, limit, sort && sortDecoded(sort));
           res.json(filter);
       }catch (error){
           res.statusCode(500).json(error);
       }

   }
}

module.exports = new InfoController();