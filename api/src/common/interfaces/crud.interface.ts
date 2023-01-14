/* eslint-disable @typescript-eslint/no-explicit-any */

export interface CRUD {
    list: (limit: number, page: number) => Promise<any>;
    create: (dto: any) => Promise<any>;
    getById: (id: string) => Promise<any>;
    deleteById: (id: string) => Promise<any>;
    patchById: (id: string, dto: any) => Promise<any>;
}