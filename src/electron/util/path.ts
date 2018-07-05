import { posix as npath, sep as osSep } from 'path';
import { exists as fsExists, mkdir as fsMkdir } from 'fs';

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
 * Get the directory of the path.
 * @param path Path string to parse.
 * @returns Path to the directory.
 */
export function dirname(path: string): string {
    return npath.dirname(path);
}

/**
 * Get the base name from the path (i.e. last directory or file name)
 * @param path Path to get the basename for.
 * @returns The string basename.
 */
export function basename(path: string): string {
    return npath.basename(path);
}


/**
 * Make a directory.
 * @param path Path to the directory.  The directory's parents must exist.
 * @returns An empty promise that evaluates once the directory has been created.
 */
function _makedir(path: string): Promise<any> {
    return new Promise(function (resolve, reject) {
        fsMkdir(path, function (e) {
            if (!e || e.code === 'EEXIST') {
                resolve();
            } else {
                reject();
            }
        });
    });
}

/**
 * Make a directory and any directories that exist above the directory.
 * @param path
 * @returns An empty promise that resolves once the directory is ready for use.
 */
export function makedirs(path: string): Promise<any> {
    return pathExists(path)
        .then((exists: boolean) => {
            if (exists) {
                return null;
            } else {
                return makedirs(dirname(path))
                    .then(() => {
                        return _makedir(path);
                    });
            }
        });
}

/**
 * Get the path to the home directory.
 * @returns A path point to the users home.
 */
export function home(): string {
    return process.env.HOME || process.env.USERPROFILE;
}
