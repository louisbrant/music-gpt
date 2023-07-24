import type { NextApiRequest, NextApiResponse } from 'next';
import * as cheerio from 'cheerio';
import * as url from 'url';

export default async function getContent(
  req: NextApiRequest,
  res: NextApiResponse<String>
) {
    
    try {
        const data = req.query ?? '';

        if(data.query){

               
            const fullUrl = String(data.query);

            const parsedUrl = new URL(fullUrl);

            const targetDomain = parsedUrl.origin;
            const targetPath = parsedUrl.pathname;

            const urlRes = await fetch(fullUrl);
            const body = await urlRes.text();

            const $ = cheerio.load(body);

            // Modify internal links
            $('a[href]').each((i: number, link: cheerio.Element) => {
                const href = $(link).attr('href') || '';
                if (href.startsWith('/') || !href.includes('://')) {
                $(link).attr('href', url.resolve(targetDomain, href));
                }
            });

            // Modify internal images, files, and scripts
            $('img[src], link[href], script[src]').each((i: number, element: cheerio.Element) => {
                const src = $(element).attr('src') || $(element).attr('href') || '';
                if (src.startsWith('/') || !src.includes('://')) {
                $(element).attr('src', url.resolve(targetDomain, src));
                }
            });

            // Modify internal CSS files
            $('link[rel="stylesheet"]').each((i: number, link: cheerio.Element) => {
                const href = $(link).attr('href') || '';
                if (href.startsWith('/') || !href.includes('://')) {
                $(link).attr('href', url.resolve(targetDomain, href));
                }
            });
         
            const resBody = $.html();
            res.status(200).send(resBody);
        }
    } catch (error) {
        res.status(404).send("404 NOT FOUND");
    }
   
  
}