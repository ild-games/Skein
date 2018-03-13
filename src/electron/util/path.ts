import { posix as npath, sep as osSep } from 'path';

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
