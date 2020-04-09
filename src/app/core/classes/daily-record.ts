import { Record } from '../interfaces/record';
import { Photo } from '../interfaces/photo';

export class DailyRecord {
    date: string = null;
    dayCount: number = null;
    latestPhoto: string;
    records: Record[] = [];
    constructor(dayCount: number) {
        this.dayCount = dayCount;
    }

    getRecordCount() {
        return this.records.length;
    }

    getHighestBt(): string {
        const sortedRecords = this.records.sort((a, b) => {
            if (!a.bodyTemperature || !b.bodyTemperature) {
                return;
            }
            return (b.bodyTemperature - a.bodyTemperature);
        });
        console.log('sortedRecords', sortedRecords);
        if (sortedRecords[0].bodyTemperature) {
            return `${sortedRecords[0].bodyTemperature} ${sortedRecords[0].bodyTemperatureUnit}`;
        } else {
            return 'N/A';
        }
    }

    getLatestPhotoPath(): string {
        function flatten<T>(arr: T[][]): Array<T> {
            return arr.reduce((flat, next) => flat.concat(next), []);
        }

        const nestedPhotos = this.records.map(record => record.photos);
        const photos = flatten(nestedPhotos);
        console.log('Flattened photo array', photos);
        const sortedPhotos = photos.sort((a, b) => +b.timestamp - +a.timestamp);
        if (sortedPhotos[0]) {
            return sortedPhotos[0].webviewPath;
        } else {
            return '';
        }
    }

}
