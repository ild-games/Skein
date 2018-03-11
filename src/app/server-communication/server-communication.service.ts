import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IResponseType } from '../../server/server-response-types';
import { IRequestType } from '../../server/server-requests-types';


@Injectable()
export class ServerCommunicationService {
    constructor(private _http: HttpClient) {
    }

    public get<ResponseType extends IResponseType>(getCommand: string): Promise<ResponseType>;
    // tslint:disable-next-line:max-line-length
    public get<RequestType extends IRequestType, ResponseType extends IResponseType>(getCommand: string, request?: RequestType): Promise<ResponseType>;
    // tslint:disable-next-line:max-line-length
    public get<RequestType extends IRequestType, ResponseType extends IResponseType>(getCommand: string, request?: RequestType): Promise<ResponseType> {
        return new Promise((resolve) => {
            const params = new HttpParams();
            if (request) {
                for (const key of Object.keys(request)) {
                    params.append(key, request[key]);
                }
            }
            this._http.get(`http://localhost:4200/${getCommand}`, { params: params }).map((response: ResponseType) => {
                if (!response) {
                    resolve(null);
                }

                resolve(response);
            }).subscribe();
        });
    }
}
