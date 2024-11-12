import {SERVER_PORT} from '../common/ports'
import * as News from "../common/newsInterface";


export function cleanQueryParams(params: News.params | undefined) : URLSearchParams {
    const urlParams = new URLSearchParams();
    if(params !== undefined ){
        const properties = Object.entries(params);
        properties.forEach(([name,o])=>{
            if(typeof o === 'string' && o.length > 0){
                urlParams.append(name, o as string);
            }
            if(typeof o === 'number'){
                urlParams.append(name, o.toString());
            }
            if(typeof o === typeof []){
                o.forEach((s:any)=>{
                    if(typeof s === 'string' && s.length > 0){
                        const searchString : string = s as string;
                        urlParams.append(name, searchString);
                    }
                });
            }
        });
    }
    return urlParams;
}


export function makeGetRequest(path : string, params: URLSearchParams|URLSearchParams ) : Promise<News.response>{
    const requestOptions = {
        method: 'GET'
    };
    const url = `http://localhost:${SERVER_PORT}/${path}${( params.size > 0)?`?${params.toString()}`:''}`;
    return fetch(url, requestOptions)
        .then((response) => {
            return response.json();
        }).catch((error) => {
            return({status:error});
    });
}