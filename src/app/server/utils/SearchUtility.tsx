import { Search } from '@/models'; // adjust the import path according to your project structure

class SearchUtility {
    static async store(query: string): Promise<void> {
        if (query && query.trim() !== "") {
            let search = await Search.findOne({ query });

            if (search) {
                search.count += 1;
                await search.save();
            } else {
                search = new Search({ query, count: 1 });
                await search.save();
            }
        }
    }
}
