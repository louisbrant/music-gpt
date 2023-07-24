import type { NextApiRequest, NextApiResponse } from 'next';
import * as cheerio from 'cheerio';
import * as url from 'url';

type Data = {
  title: string;
  title2?: string; // Add this line
};

  
export default async function getURL(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const data = req.query ?? '';

    if(data.query){
      const fullUrl = String(data.query);

      const parsedUrl = new URL(fullUrl);

      const targetDomain = parsedUrl.origin;

      const urlRes = await fetch(targetDomain);
      const urlRes2 = await fetch(fullUrl);
      const body = await urlRes.text();
      const body2 = await urlRes2.text();

      const $ = cheerio.load(body);
      const title = $('title').text();

      const $e = cheerio.load(body2);
      const title2 = $e('title').text();
      
      
      res.status(200).send({title: title, title2: title2});
    }
  } catch (error) {
    res.status(400).send({title: ''});
  }
    
  
}