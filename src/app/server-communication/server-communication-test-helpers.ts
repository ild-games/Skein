import { Observable } from 'rxjs/Observable';

import { ServerCommunicationService } from './server-communication.service';

export interface MockHttpRemotes {
    gets?: {
        [keys: string]: (params?: string[]) => { [keys: string]: any };
    };

    posts?: {
        [keys: string]: (body: any | null) => { [keys: string]: any } | null;
    };
}
export class MockHttpClient {
    constructor(public remotes: MockHttpRemotes) {
    }

    public get(command: string, options: any): Observable<Object> {
        if (options.params && options.params.keys().length > 0) {
            return this._getWithParams(command, options);
        } else {
            return this._get(command);
        }
    }

    private _get(command: string): Observable<Object> {
        return new Observable(observer => {
            let remoteKey = command.replace(`${ServerCommunicationService.website}/`, '');
            if (!this.remotes.gets[remoteKey]) {
                observer.next(null);
            } else {
                observer.next(this.remotes.gets[remoteKey]());
            }
            observer.complete();
        });
    }

    private _getWithParams(command: string, options: any): Observable<Object> {
        return new Observable(observer => {
            let remoteKey = command.replace(`${ServerCommunicationService.website}/`, '');
            let keys = options.params.keys();
            let paramSuffix = '';
            let remoteParams: string[] = [];
            for (let key of keys) {
                paramSuffix += `_${key}`;
                remoteParams.push(options.params.get(key));
            }
            let functionToCall = this.remotes.gets[remoteKey + paramSuffix];
            observer.next(functionToCall(remoteParams));
            observer.complete();
        });
    }

    public post(command: string, body: any | null, options: any): Observable<Object> {
        return new Observable(observer => {
            let remoteKey = command.replace(`${ServerCommunicationService.website}/`, '');
            if (!this.remotes.posts[remoteKey]) {
                observer.next(null);
            } else {
                observer.next(this.remotes.posts[remoteKey](body));
            }
            observer.complete();
        });
    }
}
