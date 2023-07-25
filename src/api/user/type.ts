export interface loginFormData {
    username: string,
    password: string
}

interface requestData {
    code: number,
    message: string,
    ok: boolean
}

export interface loginRequestData extends requestData {
    data: string
}

export interface userInfoRequestData extends requestData {
    data: {
        routes: string[],
        buttons: string[],
        roles: string[],
        name: string,
        avatar: string
    }
}

