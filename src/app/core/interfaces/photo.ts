import { LocationStamp } from './location-stamp';

export interface Photo {
    filepath: string;
    webviewPath: string;
    base64?: string;
    timestamp?: string;
    locationStamp?: LocationStamp;
}
