import { inject, InjectionToken } from "@angular/core";
import { IClientSerivce } from "./api-client/clients/iclients.service";
import { ISnackbarManagerService } from "./isnack-manager.service";

export const SERVICES_TOKEN = {
    HTTP : {
        CLIENT: new InjectionToken<IClientSerivce>('SERVICES_TOKEN.HTTP.CLIENT'),
        //SCHEDULE: new InjectionToken<Ischedule>('SERVICES_TOKEN.HTTP.SCHEDULE') 
    },
    SNACKBAR: new InjectionToken<ISnackbarManagerService>('SERVICES_TOKEN.SNACKBAR')
}