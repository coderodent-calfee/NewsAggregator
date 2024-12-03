import {Express, Request, Response, NextFunction, RequestHandler} from 'express';
import {setupRouter, ParamFunction} from './setup.js'

import * as News from '../common/newsInterface.js'
import {NewsApiEverything} from "../components/services/NewsApiEverything.js";
import {ArticleQueryParams, ArticleQuery} from "../components/services/NewsService.js";
import {DatabaseConnection} from "../components/database/connection";


export function setupNewsRouter(app : Express, db : DatabaseConnection){

    const paramFunction : ParamFunction = (req : Request, res : Response, next : NextFunction, value : string, name : string) => {
        switch(name){
            case 'id':
                const modified = value.toUpperCase();
                console.log("modified: ", modified);
                break;
            default:
        }
        // if the article exists:
        return next();
        // else
        // res.status(404).send("Sorry can't find that!");
    };

    // request with route params '/api/news/identifier'
    // todo: change route params so I can have more routes
    const routeFunction : RequestHandler = (req : Request, res : Response) => {

        console.log("params: ", req.params);
        const jsonResponse = JSON.stringify({server : req.url, params : req.params, isQuery:false});
        console.log("jsonResponse: ", jsonResponse);
        res.send(jsonResponse);
    };

    // request with query params '?' and '&'
    const queryFunction : RequestHandler =(req : Request, res : Response) => {
        console.log("queryFunction req.query: ", req.query);
        const queries: { state: any; topic: any; [key: string]: any } = {
            state: '',
            topic: ''
        };
        const keys = Object.keys(new ArticleQuery);
        keys.forEach((query)=>{
            if(req.query[query] !== undefined) {
                queries[query] = req.query[query];
            }
        });
        
        console.log("NewsRouter queries: ", queries);

        const newsApi = new NewsApiEverything();
        newsApi.getNewsArticles(queries).then((newsResponse)=>{
            const jsonResponse = JSON.stringify(newsResponse, null, 2);
            console.log("jsonResponse: ", jsonResponse);
            res.send(jsonResponse);
            db.process(newsResponse, queries);
        });
    };

    setupRouter(app, News.route, News.routeParams, paramFunction, routeFunction, queryFunction);
}

//https://stackoverflow.com/questions/4797534/how-to-manually-send-http-post-requests-from-firefox-or-chrome-browser