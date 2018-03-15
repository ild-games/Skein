import { posix as npath, sep as osSep } from 'path';
import { exists as fsExists } from 'fs';

/**
 * Normalize the path. Transforms all paths into unix format and simplifies things like dir/../otherdir/file.txt => otherdir/file.txt
 * @param  path Path to normalize.
 * @return Return the normalized path.
 */
export function normalize(path: string): string {
    if (osSep === '\\') {
        path = path.replace(/\\/g, '/');
    }
    return npath.normalize(path);
}

/**
 * Return a promise that evaluates to true if the path exists.
 * @param path Path to check for existence.
 * @returns A promise that evalutes to true if the path exists or false otherwise.
 */
export function pathExists(path: string): Promise<boolean> {
    return new Promise(function (resolve, reject) {
        fsExists(path, function (exists: boolean) {
            resolve(exists);
        });
    });
}

/**
 * Join an array of paths into a single path.
 * @param pathSegments Array of paths.
 */
export function join(...pathSegments: string[]): string {
    return npath.join(...pathSegments);
}

/**
 * Get the path to the home directory.
 * @returns A path point to the users home.
 */
export function home(): string {
    return process.env.HOME || process.env.USERPROFILE;
}
