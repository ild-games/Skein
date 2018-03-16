import { readFile, writeFile } from 'fs';
import { pathExists, dirname as pathDirname, makedirs } from './path';

export interface SaveResult {
    isSuccess: boolean;
    error: any;
}

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

/**
 * Save a string to the specified path.
 * @param path Path the object will be saved to.
 * @param data String that is being saved.
 * @returns Promise that resolves to a SaveResult describing the result of the save action.
 */
export function saveDataToPath(path: string, data: string): Promise<SaveResult> {
    let dirname = pathDirname(path);
    return makedirs(dirname).then(() => {
        return new Promise<SaveResult>((resolve, reject) => {
            writeFile(path, data, (err) => {
                if (err) {
                    console.log(err);
                    reject({ isSuccess: false, error: err });
                } else {
                    resolve({ isSuccess: true, error: null });
                }
            });
        });
    });
}
