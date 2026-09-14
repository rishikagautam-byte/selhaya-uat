import { generateProductLinkURL, getProductURLsCache } from './src/lib/productURLHelper.js';

async function test() {
  const url = await generateProductLinkURL('malika-drape');
  console.log("URL for malika-drape:", url);
  const cache = await getProductURLsCache();
  console.log("Cache has malika-drape?", cache.some(c => c.handle === 'malika-drape'));
}

test();
