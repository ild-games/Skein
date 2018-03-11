import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IResponseType } from '../../server/server-response-types';
import { IRequestType } from '../../server/server-requests-types';


@Injectable()
export class ServerCommunicationService {
    constructor(private _http: HttpClient) {
    }

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

    public static get website(): string {
        return 'http://localhost:4200';
    }
}
