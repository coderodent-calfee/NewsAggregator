import * as News from "client/src/common/newsInterface";

export interface params {
    state? : string;
    topic? : string;
    search? : string[];
    page? : number;
}

export const route = '/api/news';
export const queryParams = ['state','topic'];
export const routeParams = ['id']; // see types.d.ts if you want to add more

export interface Article {
    title: string;
    date: string;
    summary: string;
    link: string;
    search: string[];
    image: string | null;
    id: string;
}

export interface response {
    articles: Article[];
    status: string;
    totalResults: number;
}

export interface ArticleDictionary {
    [key: string]: News.Article;
}

export const API_KEY : string = "PUT YOUR NEWSAPI KEY HERE";
