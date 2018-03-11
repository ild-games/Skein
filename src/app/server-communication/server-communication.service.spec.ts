import { async, TestBed } from '@angular/core/testing';
import { ServerCommunicationService } from './server-communication.service';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

export interface MockHttpRemotes {
    [keys: string]: (params?: string[]) => { [keys: string]: any };
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
            if (!this.remotes[remoteKey]) {
                observer.next(null);
            } else {
                observer.next(this.remotes[remoteKey]());
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
            let functionToCall = this.remotes[remoteKey + paramSuffix];
            if (!functionToCall) {
                observer.next(null);
            } else {
                observer.next(functionToCall(remoteParams));
            }
            observer.complete();
        });
    }
}

describe('ServerCommunicationService', () => {
    let service: ServerCommunicationService;

    let mockHttpRemotes: MockHttpRemotes = {
        landingPage: (params?: string[]) => {
            return { body: 'Welcome <unknown user>!' };
        },
        landingPage_user: (params?: string[]) => {
            return { body: `Welcome ${params[0]}!` };
        },
        landingPage_user_from: (params?: string[]) => {
            return { body: `Welcome ${params[0]} from ${params[1]}!` };
        }
    };
    let mockHttpClient = new MockHttpClient(mockHttpRemotes);


    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ServerCommunicationService,
                { provide: HttpClient, useValue: mockHttpClient }
            ]
        });
        service = TestBed.get(ServerCommunicationService);
    });

    it('gets a null response for an invalid destination', () => {
        service.get('notReal').then((result: any) => {
            expect(result).toBe(null);
        });
    });

    it('gets a response with no parameters', () => {
        service.get('landingPage').then((result: any) => {
            expect(result.body).toBe('Welcome <unknown user>!');
        });
    });

    it('gets a response while providing 1 parameter', () => {
        service.get('landingPage', { user: 'John Smith' }).then((result: any) => {
            expect(result.body).toBe('Welcome John Smith!');
        });
    });

    it('gets a response while providing multiple parameters', () => {
        service.get('landingPage', { user: 'John Smith', from: 'USA' }).then((result: any) => {
            expect(result.body).toBe('Welcome John Smith from USA!');
        });
    });
});
