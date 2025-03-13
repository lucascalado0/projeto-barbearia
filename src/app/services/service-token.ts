import { inject, InjectionToken } from "@angular/core";
import { IClientSerivce } from "./api-client/clients/iclients.service";
import { ISnackbarManagerService } from "./isnack-manager.service";
import { IDilogManagerService } from "./idialog-manager.service";
import { IScheduleService } from "./api-client/schedules/ischedules.service";

export const SERVICES_TOKEN = {
    HTTP : {
        CLIENT: new InjectionToken<IClientSerivce>('SERVICES_TOKEN.HTTP.CLIENT'),
        SCHEDULE: new InjectionToken<IScheduleService>('SERVICES_TOKEN.HTTP.SCHEDULE') 
    },
    SNACKBAR: new InjectionToken<ISnackbarManagerService>('SERVICES_TOKEN.SNACKBAR'),
    DIALOG: new InjectionToken<IDilogManagerService>('SERVICES_TOKEN.DIALOG')
}