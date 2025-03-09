import { InjectionToken } from "@angular/core";
import { IClientSerivce } from "./api-client/clients/iclients.service";

export const SERVICES_TOKEN = {
    HTTP : {
        CLIENT: new InjectionToken<IClientSerivce>('SERVICES_TOKEN.HTTP.CLIENT'),
        //SCHEDULE: new InjectionToken<Ischedule>('SERVICES_TOKEN.HTTP.SCHEDULE') 
    }
}