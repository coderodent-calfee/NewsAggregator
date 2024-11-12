import '../App.css'
import React, { MouseEvent } from 'react';
import {makeGetRequest, cleanQueryParams} from "../utils/getter";
import * as News from '../common/newsInterface'

export interface GetButtonProperties {
    path : string;
    params? : News.params;
    children? : any;
}

const GetButton: React.FC<GetButtonProperties> = (props) => {
    console.log("GetButton params: ", props.params);
    const params = cleanQueryParams(props.params);
    console.log(`GetButton params : `, params.toString() );

    const path = props.path;
        
    function getRequest(event : MouseEvent){
        console.log(`GetButton getRequest params : `, params.toString() );
        return makeGetRequest(path, params); 
    }
    
    return (
        <button onClick={getRequest}>
            {props.children}
        </button>
    );
}

export default GetButton;