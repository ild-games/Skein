import { readFile } from 'fs';
import { pathExists } from './path';

/**
 * Gets raw string data from a given file path via a Promise that will either resolve
 * with the string value or reject with an error from the filesystem.
 * @param filePath file path where the data is located
 */
export function getDataFromFilePath(filePath: string): Promise<string> {
    return pathExists(filePath).then(function (exists: boolean) {
        if (exists) {
            return new Promise<string>(function (resolve, reject) {
                readFile(filePath, function (err, data) {
                    if (err) {
                        reject({ error: true });
                    } else {
                        resolve(data.toString());
                    }
                });
            });
        } else {
            return null;
        }
    });
}
