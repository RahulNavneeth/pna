import type { PageServerLoad } from './$types';
import { FETCH_URL } from "$lib/constants"
export const load: PageServerLoad = async ({ fetch, url }) => {
    const ID = url.searchParams.get('name');
    let FILE_NAME = "";
    switch (ID) {
        case "MK":
            FILE_NAME = "GOOGLE";
            break;
        case "RMN":
            FILE_NAME = "APPLE";
            break;
        case "JAVA":
            FILE_NAME = "AMAZON";
            break;
        case "SAK":
            FILE_NAME = "MICROSOFT";
            break;
        case "ALBIE":
            FILE_NAME = "META";
            break;
        case "NP":
            FILE_NAME = "NETFLIX";
            break;
        case "ASS":
            FILE_NAME = "GOLDMANSACHS";
            break;
        case "RP":
            FILE_NAME = "FLIPKART";
            break;

    }
    console.log(`${FETCH_URL}${FILE_NAME}.csv`);
    const res = await fetch(`${FETCH_URL}${FILE_NAME}.csv`);
    const DATA = await res.json();
    console.log(DATA);
    return {
        name: FILE_NAME,
        data: DATA.payload.blob.csv,
    }
};
