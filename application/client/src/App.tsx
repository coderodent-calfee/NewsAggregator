import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import GetButton from "./components/GetButton";
import NewsCardScrollContainer from "./components/NewsCardScrollContainer";

import rwcImage from './rwc.png'
import StateSelector from "./components/StateSelector";
import TopicSelector from "./components/TopicSelector";
import SearchTagSelector from "./components/SearchTagContainer";
import * as News from "./common/newsInterface";
import {cleanQueryParams, makeGetRequest} from "./utils/getter";
import SelectedArticleControl from "./components/SelectedArticleControl";

/**
 *
 *  1. Functionality:
 *      ○ View News Articles: Display a list of news articles related to state legislation.
 *      Each article should include:
 *          ■ Title
 *          ■ Published date
 *          ■ State
 *          ■ Summary or description
 *          ■ Link to the full article
 *      ○ Filter News: Allow users to filter news by state (e.g., California, Indiana) and/or
 *  by topic (e.g., education, health).
 *      ○ Search Articles: Implement a simple search functionality to find news articles by
 *  keywords in the title or description.
 *      ○ News Aggregation: Simulate fetching news articles from an external API or a
 *  local dataset. You can use dummy data or an actual news API (like the NewsAPI
 *  or any other Public News API from this list).
 *  3. Front-End:
 *      ○ Use React with Next.js (or a standalone React app).
 *      ○ Create the following UI components:
 *          ■ News List: Display the list of news articles with basic metadata (title,
 *  summary, state, topic, date).
 *          ■ Filter & Search: Implement a filtering UI where users can filter articles by
 *  state, topic, and perform keyword searches.
 *          ■ News Details: When clicking on an article, show more detailed
 *  information about the article, along with a link to the full text.
 *          ■ Responsive Design: Ensure the UI is functional and responsive on both
 *  desktop and mobile.
 *
 *  Todo:
 *
 */
function App() {
    const [state, setState] = useState('California');
    
    const [topic, setTopic] = useState('AI');
    const [search, setSearch] = useState<string[]>([]);
    const [selectedArticle, setSelectedArticle] = useState<string>('');
    const [articles, setArticles] = useState<News.ArticleDictionary>({});
    const [cache, setCache] = useState<News.ArticleDictionary>({});
    const [data, setData] = useState<string[]>([]);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    
    function debounce<T extends (...args: any[]) => any>(func: T, delay: number): (...args: Parameters<T>) => void {
        let timeoutId: NodeJS.Timeout | undefined;
        console.log("scroll debounce: ");
        return function (...args: Parameters<T>): void {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                console.log("scroll debounce func: ");
                func(...args);
            }, delay);
        };
    }

    // Watch the `state`, `topic`, and `search` parameters
    useEffect(() => {
        setLoading(true);
        setArticles({});
        setData([]);
        setPage(1);
    }, [state, topic, search]);

    useEffect(() => {
        fetchArticles().then(() => console.log("scroll useEffect: fetchArticles Done")).catch((error) => {
            console.error(`Error ${error} fetchArticles`);
        });
    }, [page]);

    useEffect(() => {
        if (loading) {
            setPage((prevPage) => prevPage + 1);
        }
    }, [loading]);

    const buildArticleMap = (articleResponse: News.Article[]) : void => {
        const added : string[] = [];
        const addedArticles : News.ArticleDictionary = {};
        articleResponse.forEach((article)=>{
            added.push(article.id);
            addedArticles[article.id] = article;
        });
        setArticles((prevData : News.ArticleDictionary) => ({...prevData, ...addedArticles}));
        setData((prevData) => [...prevData, ...added]);
        setCache(articles);
    }
    
    const fetchArticles = async () => {
        setLoading(true);
        const path = 'api/news';
        const currentPage = (page > 0)?page:1;
        const params = cleanQueryParams({state, topic, search, page: currentPage});
        makeGetRequest(path, params).then( (response : News.response ) => {
            if(response.status === 'ok'){
                buildArticleMap(response.articles);
            }else{
                console.log(`scroll error: status:${response.status}`);
                buildArticleMap(response.articles);
                setData(['Error']);
            }
            setLoading(false);
        }).catch((error) => {
            console.error(`Error ${error} makeGetRequest`);
        });
    };


    const handleScroll = () : void => {
        if (
            document.body.scrollHeight - 300 <
            window.scrollY + window.innerHeight
        ) {
            setLoading(true);
        }
    };

    window.addEventListener("scroll", debounce(handleScroll, 500));
    console.warn("starting here!!!!!!");
    return (
        <div className="App">
            <header className="App-header grid-container ">
                <div className="icon">
                    <a className="App-link" href="https://www.linkedin.com/in/robert-w-calfee/" target="_blank" rel="noopener noreferrer" >
                        <img src={rwcImage} alt="Robert W. Calfee"/>
                    </a>
                </div>
                <div className="header">
                    <StateSelector state={state} setState={setState}/>
                    <TopicSelector topic={topic} setTopic={setTopic}/>
                    <SearchTagSelector path="header" search={search} setSearch={setSearch}/>
                </div>
                <div className="navigation">
                    <div className="button-holder">
                        <GetButton path={'api/news'} params={{state, topic, search, page}}>
                            Get News Articles
                        </GetButton>
                        <GetButton path={'api/news/1234567890'}>
                            Get A News Article
                        </GetButton>
                        <GetButton path={'api/database?action=init'}>
                            Initialize Database
                        </GetButton>
                    </div>
                    <div className="button-holder">
                        <SelectedArticleControl
                            path={'api/news'}
                            params={{state, topic, search, page}}
                            data={data}
                            articles={articles}
                            loading={loading}
                            selectedArticle={selectedArticle ?? ''}
                            setSelectedArticle={setSelectedArticle}
                            search={search} setSearch={setSearch}
                        />
                    </div>
                </div>
                <div className="content">
                    <NewsCardScrollContainer 
                        path={'api/news'} 
                        params={{state, topic, search, page}}
                        data={data}
                        articles={articles}
                        loading={loading}
                        selectedArticle={selectedArticle ?? ''}
                        setSelectedArticle={setSelectedArticle}
                    />
                </div>
            </header>
        </div>
    );
}

export default App;
