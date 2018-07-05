import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IResponseType } from '../../server/server-response-types';
import { IRequestType } from '../../server/server-requests-types';


@Injectable()
export class ServerCommunicationService {
    constructor(private _http: HttpClient) {
    }

    public get(getCommand: string): Promise<void>;
    public get<ResType extends IResponseType>(getCommand: string): Promise<ResType>;
    public get<ReqType extends IRequestType, ResType extends IResponseType>(getCommand: string, request?: ReqType): Promise<ResType>;
    public get<ReqType extends IRequestType, ResType extends IResponseType>(getCommand: string, request?: ReqType): Promise<ResType> {
        return new Promise((resolve) => {
            let params = new HttpParams();
            if (request) {
                for (const key of Object.keys(request)) {
                    params = params.append(key, request[key]);
                }
            }
            let fullCommand = `${ServerCommunicationService.website}/${getCommand}`;
            this._http.get(fullCommand, { params: params }).subscribe((response: ResType) => {
                if (!response) {
                    resolve(null);
                }

                resolve(response);
            });
        });
    }

    public post<ReqType extends IRequestType>(postCommand: string, request: ReqType): Promise<null>;
    public post<ReqType extends IRequestType, ResType extends IResponseType>(postCommand: string, request: ReqType): Promise<ResType> {
        return new Promise((resolve) => {
            let fullCommand = `${ServerCommunicationService.website}/${postCommand}`;
            this._http.post(fullCommand, request).subscribe((response: ResType) => {
                if (!response) {
                    resolve(null);
                }

                resolve(response);
            });
        });
    }


    public static get website(): string {
        return 'http://localhost:4200';
    }
}
