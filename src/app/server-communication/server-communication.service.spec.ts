import { async, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ServerCommunicationService } from './server-communication.service';
import { StoreService } from '../state/store.service';
import { mainReducer } from '../main.reducer';
import { MockHttpRemotes, MockHttpClient } from './server-communication-test-helpers';

describe('ServerCommunicationService', () => {
    let service: ServerCommunicationService;

    let mockHttpRemotes: MockHttpRemotes = {
        gets: {
            landingPage: (params?: string[]) => {
                return { body: 'Welcome <unknown user>!' };
            },
            landingPage_user: (params?: string[]) => {
                return { body: `Welcome ${params[0]}!` };
            },
            landingPage_user_from: (params?: string[]) => {
                return { body: `Welcome ${params[0]} from ${params[1]}!` };
            },
        },

        posts: {
            savePage: (body: any | null) => {
                return { body: 'good save!' };
            },

            logError: (body: any | null) => {
                return null;
            }
        }
    };
    let mockHttpClient = new MockHttpClient(mockHttpRemotes);

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: StoreService, useValue: new StoreService(mainReducer) },
                ServerCommunicationService,
                { provide: HttpClient, useValue: mockHttpClient }
            ]
        });
        service = TestBed.get(ServerCommunicationService);
    });

    describe('get', () => {
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

    describe('post', () => {
        it('gets a null response for an invalid destination', () => {
            service.post('notReal', null).then((result: any) => {
                expect(result).toBe(null);
            });
        });

        it('test a post with a response', () => {
            service.post('savePage', { saveThis: 'dataToSave' }).then((result: any) => {
                expect(result.body).toBe('good save!');
            });
        });


        it('test a post without a response', () => {
            service.post('logError', { error: 'bad error happened' }).then((result: any) => {
                expect(result).toBe(null);
            });
        });
    });
});
