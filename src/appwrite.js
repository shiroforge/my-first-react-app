import { Client, Databases, ID, Query } from 'appwrite';

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PROJECT_ID);

const database = new Databases(client);



export const updateSearchCount = async (searchTerm, movie) => {
    //1.検索用語がデータベースにあるか確認するために、AppwriteのSDKを使う
    try {
        const result = await database.listDocuments(
            DATABASE_ID,
            COLLECTION_ID,
            [Query.equal('searchTerm', searchTerm)]
        );

        //2.検索用語がデータベースにある場合は、カウントを更新する
        if (result.documents.length > 0) {
            const doc = result.documents[0];

            await database.updateDocument(
                DATABASE_ID,
                COLLECTION_ID,
                doc.$id,
                {
                    count: doc.count + 1,
                }
            );
        //3.検索用語がデータベースにない場合は、新しいドキュメントを作成し、カウントを1に設定する。
        } else {
            await database.createDocument(
                DATABASE_ID,
                COLLECTION_ID,
                ID.unique(),
                {
                    searchTerm: searchTerm,
                    count: 1,
                    movie_id: movie.id,
                    poster_url: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
                }
            );
        }
    }catch (error) {
        console.error('Error checking search term:', error);
    }

}

export const getTrendingMovies = async () => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(5),
            Query.orderDesc("count"),
        ])

        return result.documents;
    }catch(error) {
        console.error(error);
    }
}