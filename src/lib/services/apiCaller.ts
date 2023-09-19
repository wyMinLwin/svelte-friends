const localServer = "http://localhost:3000/api/v1";

type MethodTypes = "GET" | "POST" | "PUT" | "DELETE";
type SendRequestPropsType = {
    method: MethodTypes;
    path: string;
    token?: string;
    data?: any; 
}

type OptionsType = {
    method: MethodTypes;
    headers: Record<string,string>;
    body?: string,
}

type APIResponseType = {
    success: boolean,
    message: string,
    data: object
}

const sendRequest = async ({method,path,token,data}:SendRequestPropsType) : Promise<APIResponseType|undefined> => {
    const options:OptionsType = { 
        method,
        headers:{}
    };
    if (data) {
        options.headers['Content-Type'] = 'application/json';
        options.headers['Access-Control-Allow-Origin'] = '*';
        options.body = JSON.stringify(data);
    }
    if (token) {
        options.headers['Authorization'] = token;
    }
    try {
        const res = await fetch(`${localServer}/${path}`,options);
        if (res.ok) {
            const data:APIResponseType = await res.json();
            return data
        }
    } catch (e) {
        return undefined;
    }
}

export const GetRequest = ({path,token}:{path:string,token?:string}) => {
    return sendRequest({method:'GET',path,token});
}

export const PostRequest = ({path,token,data}:{path:string,token?:string,data?:any}) => {
    return sendRequest({method:'POST',path,token,data});
}

export const PutRequest = ({path,token,data}:{path:string,token?:string,data?:any}) => {
    return sendRequest({method:"PUT",path,token,data});
}

export const DeleteRequest = ({path,token}:{path:string,token?:string}) => {
    return sendRequest({method:'DELETE',path,token});
}