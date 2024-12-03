import express from 'express';
import cors from 'cors';
import {setupNewsRouter} from './routes/news.js';
import {setupDatabaseRouter} from "./routes/database.js";
import {DatabaseConnection, DatabaseConnectionFactory} from "./components/database/connection.js";
import {NewsApiEverything} from './components/services/NewsApiEverything.js';
import {SERVER_PORT, CLIENT_PORT} from './common/ports.js'

/**
 * 1. Functionality:
 *  ○ View News Articles: Display a list of news articles related to state legislation.
 *    Each article should include:
 *      ■ Title
 *      ■ Published date
 *      ■ State
 *      ■ Summary or description
 *      ■ Link to the full article
 *  ○ Filter News: Allow users to filter news by state (e.g., California, Indiana) 
 *    and/or by topic (e.g., education, health).
 *  ○ Search Articles: Implement a simple search functionality to find news articles 
 *    by keywords in the title or description.
 *  ○ News Aggregation: Simulate fetching news articles from an external API or a
 *    local dataset. You can use dummy data or an actual news API (like the NewsAPI
 *    or any other Public News API from this list).
 * 2. Back-End:
 *  ○ Use Node.js with Express (or Next.js API routes).
 *  ○ Implement the following API endpoints:
 *    ■ GET /news?state=x&topic=y&search=keyword
 *      : Retrieve a list of news articles filtered by state, topic, or search keywords.
 *    ■ GET /news/
 *      : Retrieve detailed information about a specific news article.
 *    ■ POST /news (optional)
 *    : Simulate the ability to add new articles to the system (useful for testing how new data is integrated).
 *  ○ Data Storage: Use an in-memory store like SQLite, Redis, or a simple database
 *    (MySQL, PostgreSQL) to store news articles with relevant metadata.
 *  ○ Use TypeScript for type safety and clean code.
 *  ○ For news aggregation, simulate the process of pulling news from multiple sources 
 *    (you can create a script that runs periodically or allow for manual article addition via an API).
 * Todo: for server--
 * Fetch news
 * API KEY for newsapi.org News.API_KEY
 * (query param doesn't work: use X-Api-Key: News.API_KEY)
 * https://newsapi.org/v2/everything?q=(California AND Judge)&from=2024-10-01 // note combined search
 * 
 * SQL schema
 * POST
 */
console.log("Server starts!");
export const app = express();

const dbReady = new DatabaseConnectionFactory().create("current.db");

const allowedOrigins = [`http://localhost:${CLIENT_PORT}`];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(cors(options));
app.use(express.json());

app.get('/', (req, res) => {
  res.send(`This is the Server: Express App, listening at http://localhost:${SERVER_PORT}/`);
});


dbReady.then((db)=>{
    setupDatabaseRouter(app, db);
    setupNewsRouter(app, db);
});


app.get('*', (req, res) => {
    res.status(404).json({ error: `This is the Server: 404\n ${req.url} not found` })
});

app.listen(SERVER_PORT, () => {
    return console.log(`console.log:  Express is listening at http://localhost:${SERVER_PORT}`);
});

