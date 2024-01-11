import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { parse } from 'rss-to-json';
import cors from 'cors';
import dataSources from "./utils/data-sources";

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.get('/feed', async (req: Request, res: Response) => {
  const feedArray: { title: any; description: any; link: any; image: any; category: any; items: any[]; }[] = [];
 
  await Promise.all(dataSources.map(async (mainItem, idx) => {
    try {
      await Promise.all(mainItem.sources.map(async (source, index) => {
        if (source.active) {
          const feed = await parse(source.url);
          feedArray.push(feed);
        } 
      }));
    } catch (error) {
      console.error(error);
    }
  }));

  res.send(feedArray);
})

app.listen(port, () => {
  console.log(`Read Point Backend services listening on port ${port}`)
})