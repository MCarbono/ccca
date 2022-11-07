export default interface HttpRequest {
    Do(method: string, url: string, data?: any, queryParamsKey?: any, queryParamsValue?: string): Promise<any>
}