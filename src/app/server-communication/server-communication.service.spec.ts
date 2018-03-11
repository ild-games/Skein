import { async, TestBed } from '@angular/core/testing';
import { ServerCommunicationService } from './server-communication.service';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

class MockHttpClient {
    private _remotes: { [keys: string]: string } = {
        landingPage: 'Welcome <unknown user>!',
        landingPage_user: 'Welcome {user}!',
        landingPage_user_from: 'Welcome {user} from {from}!'
    };

    public get(command: string, options: any): Observable<Object> {
        return new Observable(observer => {
            let remoteKey = command.replace(`${ServerCommunicationService.website}/`, '');
            let keys = options.params.keys();
            if (keys.length > 0) {
                let paramSuffix = '';
                for (let key of keys) {
                    paramSuffix += `_${key}`;
                }
                let nonTemplateValue = this._remotes[remoteKey + paramSuffix];
                let templatedValue = nonTemplateValue;
                for (let key of keys) {
                    templatedValue = templatedValue.replace(`{${key}}`, options.params.get(key));
                }
                observer.next(templatedValue);
            } else {
                observer.next(this._remotes[remoteKey]);
            }
            observer.complete();
        });
    }
}

describe('ServerCommunicationService', () => {
    let service: ServerCommunicationService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ServerCommunicationService,
                { provide: HttpClient, useClass: MockHttpClient }
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
            expect(result).toBe('Welcome <unknown user>!');
        });
    });

    it('gets a response while providing 1 parameter', () => {
        service.get('landingPage', { user: 'John Smith' }).then((result: any) => {
            expect(result).toBe('Welcome John Smith!');
        });
    });

    it('gets a response while providing multiple parameters', () => {
        service.get('landingPage', { user: 'John Smith', from: 'USA' }).then((result: any) => {
            expect(result).toBe('Welcome John Smith from USA!');
        });
    });
});
