import {Express, NextFunction, Request, Response, RequestParamHandler, RequestHandler} from 'express';

export type ParamFunction = (req : Request, res : Response, next : NextFunction, value : string, name : string) => void;

export function setupRouter(
    app : Express, 
    route : string, 
    routeParams : string[]=[],
    paramFunction : ParamFunction|undefined,
    routeFunction : RequestHandler|undefined,
    queryFunction : RequestHandler|undefined
){
    const routeParamString = `/:${routeParams.join("/:")}`;
    const routeParam = route + routeParamString;

    if(routeParams.length > 0 && paramFunction !== undefined){
        routeParams.forEach((name)=>{
            const NAME = name;
            const handler : RequestParamHandler = (req : Request, res : Response, next : NextFunction, value : string) => {
                paramFunction(req, res, next, value, NAME);
            }
            app.param(name, handler);
        });
    }

    // request with route params '/api/news/identifier'
    if(routeFunction !== undefined) {
        app.get(routeParam, routeFunction);
    }

    // request with query params '?' and '&'
    if(queryFunction !== undefined) {
        app.get(route, queryFunction);
    }
    // TODO: There's no support for both params and variable routes
}