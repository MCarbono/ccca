import HttpRequest from "./HttpRequest";
import axios from "axios"
import { URLSearchParams } from "url"

export default class HttpRequestAdapter implements HttpRequest {
    async Do(method: string, url: string, data?: any, queryParamsKey?: any, queryParamsValue?: string): Promise<any> {
        let options: request = {
            method,
            url,
            data,
        }
        if (queryParamsKey && queryParamsValue) {
            const params = new URLSearchParams();
            params.append(queryParamsKey, queryParamsValue)
            options.params = params
        }
        const response = await axios(options)
        return response.data
    }
}

type request = {
    method: string
    url: string,
    data?: any,
    params?: any
}