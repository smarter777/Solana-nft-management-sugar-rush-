import fileDownloader from 'js-file-download'
import { ICache } from './interfaces'

// export function cachePath(
//   env: string,
//   cacheName: string,
//   cPath: string = CACHE_PATH,
//   legacy: boolean = false,
// ) {
//   const filename = `${env}-${cacheName}`;
//   return path.join(cPath, legacy ? filename : `${filename}.json`);
// }

// export function loadCache(
//   cacheName: string,
//   env: string,
//   cPath: string = CACHE_PATH,
//   legacy: boolean = false,
// ) {
//   const path = cachePath(env, cacheName, cPath, legacy);

//   if (!fs.existsSync(path)) {
//     if (!legacy) {
//       return loadCache(cacheName, env, cPath, true);
//     }
//     return undefined;
//   }

//   return JSON.parse(fs.readFileSync(path).toString());
// }

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function saveCache(cacheName: string, env: string, cacheContent: ICache) {
    cacheContent.env = env
    cacheContent.cacheName = cacheName
    fileDownloader(JSON.stringify(cacheContent), cacheName)
}
