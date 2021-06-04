import {IssuesResponse} from "../models/responses/Responses";
import {get} from "../../common/network/Api";

export async function getIssues(): Promise<IssuesResponse> {
    return await get<IssuesResponse>("/communities/issues")
}