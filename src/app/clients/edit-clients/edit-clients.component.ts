import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ClientsService } from '../../services/api-client/clients/clients.service';
import { SERVICES_TOKEN } from '../../services/service-token';
import { IClientSerivce } from '../../services/api-client/clients/iclients.service';
import { SnackbarManagerService } from '../../services/snackbar-manager.service';
import { ISnackbarManagerService } from '../../services/isnack-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClientModelForm } from '../client.models';
import { ClientFormComponent } from '../components/client-form/client-form.component';


@Component({
  selector: 'app-edit-clients',
  imports: [ClientFormComponent],
  templateUrl: './edit-clients.component.html',
  styleUrl: './edit-clients.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.HTTP.CLIENT, useClass: ClientsService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService }
  ]
})
export class EditClientsComponent implements OnInit, OnDestroy {

  private httpSubscritpions: Subscription[] = []

  client: ClientModelForm = { id: 0, name: '', email: '', phone: '' }

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.CLIENT) private readonly httpService: IClientSerivce,
    @Inject(SERVICES_TOKEN.SNACKBAR) private readonly snackBarManager: ISnackbarManagerService,
    private readonly activeRoute: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.paramMap.get('id')
    if (!id) {
      this.snackBarManager.show('Erro ao recuperar informacoes do cliente')
      this.router.navigate(['clients/list'])
      return
    }

    this.httpSubscritpions?.push(this.httpService.findById(Number(id)).subscribe(data => this.client = data))
  }

  ngOnDestroy(): void {
    this.httpSubscritpions.forEach(s => s.unsubscribe)
  }

  onSubmitClient(value: ClientModelForm) {
    const { id, ...request } = value
    if (id) {
      this.httpSubscritpions?.push(this.httpService.update(id, request).subscribe(_ => {
        this.snackBarManager.show('Usuario atualizado com sucesso!')
        this.router.navigate(['clients/list'])
      }))

      this.snackBarManager.show('Um erro inesperado aconteceu')
      this.router.navigate(['clients/list'])
    }
  }


}
