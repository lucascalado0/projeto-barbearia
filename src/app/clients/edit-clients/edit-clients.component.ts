import { Component, Inject } from '@angular/core';
import { ClientsService } from '../../services/api-client/clients/clients.service';
import { SERVICES_TOKEN } from '../../services/service-token';
import { IClientSerivce } from '../../services/api-client/clients/iclients.service';

@Component({
  selector: 'app-edit-clients',
  imports: [],
  templateUrl: './edit-clients.component.html',
  styleUrl: './edit-clients.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.HTTP.CLIENT, useClass: ClientsService }
  ]
})
export class EditClientsComponent {
  constructor(@Inject(SERVICES_TOKEN.HTTP.CLIENT) private readonly httpService: IClientSerivce){}
}
