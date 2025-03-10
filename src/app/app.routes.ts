import { Routes } from '@angular/router';
import { EditClientsComponent } from './clients/edit-clients/edit-clients.component';
import { NewClientComponent } from './clients/new-client/new-client.component';
import { ListClientsComponent } from './clients/list-clients/list-clients.component';
import { SchedulesMonthComponent } from './schedules/schedules-month/schedules-month.component';

export const routes: Routes = [
    {path: 'clients/edit-client/:id', component: EditClientsComponent, data: {title: 'Atualizar Cliente'}},
    {path: 'clients/new-client', component: NewClientComponent, data: {title: 'Cadastrar Cliente'}},
    {path: 'clients/list', component: ListClientsComponent, data: {title: 'Clientes Cadastrados'}},
    {path: 'schedules/month', component: SchedulesMonthComponent, data: {title: 'Agendamentos'}},
    {path: '**', redirectTo: 'schedules/month'}
];
