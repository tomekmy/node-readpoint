import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { parse } from 'rss-to-json';
import cors from 'cors';
import dataSources from './utils/data-sources';
import crypto from 'crypto';

type FeedItem = {
  title: string;
  created: string;
  description: string;
  enclosures: { url: string }[];
  link: string;
};

type FeedArray = {
  title: string;
  description: string;
  link: string;
  image: string;
  items: FeedItem[];
  mainIdx: number;
  sourceIdx: number;
};

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.get('/feed', async (req: Request, res: Response) => {
  const feedArray: FeedArray[] = [];

  if (!('sources' in req.query)) {
    await Promise.all(
      dataSources.map(async (mainItem, mainIndex) => {
        try {
          await Promise.all(
            mainItem.sources.map(async (source, sourceIndex) => {
              if (source.active) {
                const feed = await parse(source.url);
                feedArray.push({
                  ...feed,
                  mainIdx: mainIndex,
                  sourceIdx: sourceIndex,
                });
              }
            }),
          );
        } catch (error) {
          console.error(error);
        }
      }),
    );
  } else {
    const sourcesIds = req.query.sources!.toString().split(',');
    await Promise.allSettled(
      sourcesIds.map(async (sourceId) => {
        await Promise.all(
          dataSources.map(async (mainItem, mainIndex) => {
            try {
              await Promise.all(
                mainItem.sources.map(async (source, sourceIndex) => {
                  if (source.id === sourceId) {
                    const feed = await parse(source.url);
                    feedArray.push({
                      ...feed,
                      mainIdx: mainIndex,
                      sourceIdx: sourceIndex,
                    });
                  }
                }),
              );
            } catch (error) {
              console.error(error);
            }
          }),
        );
      }),
    );
  }

  const responseData = dataSources.map((mainItem, mainIndex) => {
    return {
      ...mainItem,
      sources: mainItem.sources.map((source, sourceIndex) => {
        return {
          ...source,
          feed: feedArray
            .find((item) => item.mainIdx === mainIndex && item.sourceIdx === sourceIndex)
            ?.items.map((item) => ({
              ...item,
              id: crypto.randomUUID(),
            })),
        };
      }),
    };
  });

  const inactiveEmptyFeed = responseData.map((mainItem) => {
    return {
      ...mainItem,
      sources: mainItem.sources.map((source) => {
        return {
          ...source,
          active: !!source.feed?.length,
        };
      }),
    };
  });

  if (req.query.limit) {
    const limit = parseInt(req.query.limit!.toString());
    inactiveEmptyFeed.forEach((mainItem) => {
      mainItem.sources.forEach((source) => {
        if (source.feed && source.feed.length > limit) {
          source.feed = source.feed.slice(0, limit);
        }
      });
    });
  }

  res.send(inactiveEmptyFeed);
});

app.listen(port, () => {
  console.log(`Read Point Backend services listening on port ${port}`);
});
