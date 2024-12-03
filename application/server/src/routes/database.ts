import {Express, Request, Response, NextFunction, RequestHandler} from 'express';
import {setupRouter, ParamFunction} from './setup.js'
import {DatabaseConnection} from "../components/database/connection.js";

export const route = '/api/database';
export const queryParams = ['action'];
export const routeParams = ['table']; // see types.d.ts if you want to add more

export function setupDatabaseRouter(app : Express, db : DatabaseConnection){
   
    const paramFunction : ParamFunction = (req : Request, res : Response, next : NextFunction, value : string, name : string) => {
        switch(name){
            case 'table':
                const modified = value.toLowerCase();
                console.log("modified: ", modified);
//                req.table = modified;
                break;
            default:
        }
        return next();
    };

    // request with route params '/api/database/:table'
    const routeFunction : RequestHandler = (req : Request, res : Response) => {
        const params: { [key: string]: string } = {};
        routeParams.forEach((param)=>{
            if(req.params[param] !== undefined) {
                params[param] = req.params[param];
            }
        });
        const jsonResponse = JSON.stringify({server : req.url, params, isQuery:false});
        res.send(jsonResponse);
    };

    // request with query params '?' and '&'
    const queryFunction : RequestHandler =(req : Request, res : Response) => {

        if(Object.keys(req.query).includes('action')){
            const action = req.query['action'];
            switch(action){
                case 'init': {
                    db.resetDatabaseTables();
                    db.printDatabaseTables();
                }
                break;
                case 'load': {
                    console.log('todo: load database');
                }
                break;
                case 'save': {
                    console.log('todo: save database');
                }
                break;
                default:{
                    
                }
            }            
        }
        
        const jsonResponse = JSON.stringify({server : req.url, query : req.query, isQuery:true});
        res.send(jsonResponse);
    };
    setupRouter(app, route, routeParams, paramFunction, routeFunction, queryFunction);
}

// todo: use for testing
// curl -i -X GET http://localhost:3035/api/database/my-table