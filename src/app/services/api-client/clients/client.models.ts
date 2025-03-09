export interface SaveClientRequest {
    name: string,
    email: string,
    phone: string,
}

export interface UpdateClientResponse {
    name: string,
    email: string,
    phone: string,
}


export interface UpdateClientRequest {
    name: string,
    email: string,
    phone: string,
}

export interface SaveClientResponse {
    id: number,
    name: string,
    email: string,
    phone: string,
}

export interface ResponseClientRequest {
    id: number,
    name: string,
    email: string,
    phone: string,
}

export interface ListClientResponse {
    id: number,
    name: string,
    email: string,
    phone: string,
}

export interface DetailClientResponse {
    id: number,
    name: string,
    email: string,
    phone: string,
}