import fetch from 'node-fetch';
import MD5 from 'md5'

export interface ArticleQueryParams {
    state : string;
    topic : string;
    search? : string[];
    page? : number;
}

export class ArticleQuery implements ArticleQueryParams {
    state: string;
    topic: string;
    search: string[];
    page: number;

    constructor() {
        this.state = 'any';
        this.topic = 'any';
        this.search =  [];
        this.page =  1;
    }
}

export default abstract class NewsService {
    static BODY_REQUESTS = [`POST`, `PUT`, `PATCH`];

    idFromLink(link: string): string {
        return  MD5(link);
    }

    abstract getNewsArticles({state, topic, search, page}:ArticleQueryParams) : Promise<Object>;

    async getData(url : URL, method: string = 'GET', headers: Headers = new Headers(), body?: Object|undefined) : Promise<any> {
        return fetch(url, {
            method
        });
    }
}