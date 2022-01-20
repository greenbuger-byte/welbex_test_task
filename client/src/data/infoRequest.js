import http from "./http";
const infoRequest = {
    list: (page=1, limit, filters, sorts) => {
        console.log(filters);
       let request = '';
       filters && Object.entries(filters).forEach( ([item, value], index) => {
            if(value!==null) request += `&rows[${index}]=${item}_${value.compare}_${value.value}`;
       });
       if(Object.values(sorts)[0] && Object.values(sorts)[0] !== null){
           request += `&sort=${Object.keys(sorts)}_${Object.values(sorts)}`;
       }
       console.log(request)
       return http.get(`/info?page=${page}&limit=${limit}${request}`).then( response => {
            const { data} = response;
            return data;
        })
    }
};

export default infoRequest;