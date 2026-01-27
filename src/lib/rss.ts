import { XMLParser } from "fast-xml-parser";

type RSSFeed = {
    channel: {
        title: string;
        link: string;
        description: string;
        item: RSSItem[];
    };
};

type RSSItem = {
    title: string;
    link: string;
    description: string;
    pubDate: string;
}

function isRss(obj: any): obj is RSSFeed {
    return (
        typeof obj === 'object' && obj !== null && 'channel' in obj && 
        typeof obj.channel === 'object' && 
        'title' in obj.channel && 'link' in obj.channel &&
        'description' in obj.channel
    );
}

export async function fetchFeed(feedURL: string) {
    const userAgent = "gator";
    
    const response = await fetch(feedURL, {
        method: 'GET',
        headers: {
            'User-Agent': userAgent
        }
    });

    const textData = await response.text();
    const parser = new XMLParser();
    let jobj = parser.parse(textData);

    const root = jobj.rss;

    if (!(isRss(root))) {
        throw new Error("channel field not present.");
    }

    const title = root.channel.title;
    const link = root.channel.link;
    const description = root.channel.description;

    let items: RSSItem[] = [];
    const rawItem = root.channel.item;

    if (Array.isArray(rawItem)) {
        items = rawItem;
    } else if (rawItem && typeof rawItem === 'object') {
        items = [rawItem];
    }

    const validItems: RSSItem[] = [];

    for (let item of items) {
        if (!item.title || !item.link || !item.description || !item.pubDate) {
            continue;
        }
        validItems.push({
            title: item.title,
            link: item.link,
           description: item.description,
             pubDate: item.pubDate,
         });
     }

    return {
        channel: {
            title,
            link,
            description,
            item: validItems,
        },
    };
}
