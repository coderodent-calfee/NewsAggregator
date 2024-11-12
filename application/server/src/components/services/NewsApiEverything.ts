import NewsService, {ArticleQueryParams} from './NewsService.js'
import NewsAPI from 'newsapi'
import * as News from "../../common/newsInterface";


/**
 * (query param doesn't work: use X-Api-Key:  News.API_KEY)
 * https://newsapi.org/v2/everything?q=(California AND Judge)&from=2024-10-01 NOTE: combined search
 * https://newsapi.org/v2/everything?q=(California AND (Judge OR Legal OR Lawyer OR Lawmaker))
 * returns a response like:{
 *     "status": "ok",
 *     "totalResults": 1125,
 *     "articles": [
 *         {
 *             "source": {
 *                 "id": null,
 *                 "name": "Yahoo Entertainment"
 *             },
 *             "author": "Mariella Moon",
 *             "title": "Judge blocks new California law barring distribution of election-related AI deepfakes",
 *             "description": "One of California's new AI laws, which aims to prevent AI deepfakes related to elections from spreading online, has been blocked a month before the US presidential elections. As TechCrunch and Reason report, Judge John Mendez has issued a preliminary injuncti…",
 *             "url": "https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_58afc5d8-c511-4803-9be0-76953910c548",
 *             "urlToImage": null,
 *             "publishedAt": "2024-10-03T13:30:43Z",
 *             "content": "If you click 'Accept all', we and our partners, including 240 who are part of the IAB Transparency &amp; Consent Framework, will also store and/or access information on a device (in other words, use … [+678 chars]"
 *         },
 *         
 *   newsapi.v2.everything({
 *      q: 'AI',
 *      sources: 'bbc-news,the-verge',
 *      domains: 'bbc.co.uk,techcrunch.com',
 *      from: '2017-12-01',
 *      to: '2017-12-12',
 *      language: 'en',
 *      sortBy: 'relevancy',
 *      page: 2
 *   })
 */

const newsapi = new NewsAPI(News.API_KEY);


export class NewsApiEverything extends NewsService {

    async getNewsArticles({state, topic, search, page} : ArticleQueryParams ): Promise<News.response>{
        const legalTags = [`Judge`, `Legal`, `Lawyer`, `Lawmaker`];
        const searchArg : string[] = [];
        if(typeof search === 'string'){
            searchArg.push(search);
        }
        if(typeof search === typeof searchArg){
            searchArg.push(...search);
        }

        let query = `(${state} AND ${topic} ${(searchArg?.length>0)?`AND (${searchArg.join(' OR ')})`:''} AND (${legalTags.join(' OR ')}))`;

        console.log(`query : ${query}`);
        // todo: why does this library work and my code did not?
        return newsapi.v2.everything({
            showHeaders: true,
            q: query,
            language: 'en',
            pageSize : 20,            
            page
        }).then(res => {
            // collect just title, date, state, summary, link
            // make an id
            // sort out search (add topic)
            const articles : News.Article[] = res.articles?.map((article): News.Article => {
                return {
                    title: article.title,
                    date: article.publishedAt,
                    summary: article.description,
                    link: article.url,
                    search: [...searchArg, state, topic],
                    image: article.urlToImage,
                    id: this.idFromLink(article.url)
                };
            }); 
            
            return {
                articles: articles,
                status: res.status,
                totalResults: res.totalResults
            };
        }).catch((error) => {
            console.error(`Error ${error} newsapi getNewsArticles Request ${state} ${topic} ${search} ${page} `);
            return {
                articles: [
                    {
                        title: `Error ${error}`,
                        date: 'Error',
                        summary: 'Error',
                        link: 'Error',
                        search: [],
                        image: undefined,
                        id: 'Error'
                    }
                ],
                status: `Error ${error} newsapi getNewsArticles Request ${state} ${topic} ${search} ${page} `,
                totalResults: 0
            };            
        });;
    }
}