import { AfterViewInit, Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { SERVICES_TOKEN } from '../../services/service-token';
import { DialogManagerService } from '../../services/dialog-manager.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ClientScheduleAppointmentModel, SaveScheduleModel, ScheduleAppointmentMonthModel, SelectClientModel } from '../schedule.models';
import { FormControl, FormsModule, NgForm } from '@angular/forms';
import { IDilogManagerService } from '../../services/idialog-manager.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
import { YesNoDialogComponent } from '../../commons/components/yes-no-dialog/yes-no-dialog.component';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-schedules-calendar',
  imports: [
    CommonModule, MatDatepickerModule, FormsModule, MatCardModule, MatButtonModule, MatIconModule,
    MatPaginatorModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatTooltipModule, MatTableModule, MatTimepickerModule
  ],
  templateUrl: './schedules-calendar.component.html',
  styleUrl: './schedules-calendar.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.DIALOG, useClass: DialogManagerService }
  ]
})
export class SchedulesCalendarComponent implements AfterViewInit, OnChanges, OnInit {

  private subscription?: Subscription

  private _selected: Date = new Date();

  displayedColumns: string[] = ['startAt', 'endAt', 'client', 'actions']

  dataSource!: MatTableDataSource<ClientScheduleAppointmentModel>

  addingSchedule: boolean = false

  newSchedule: SaveScheduleModel = { startAt: undefined, endAt: undefined, clientId: undefined }

  clientSelectFormControl = new FormControl()

  @Input() monthSchedule!: ScheduleAppointmentMonthModel
  @Input() clients: SelectClientModel[] = []

  @Output() onDateChange = new EventEmitter<Date>()
  @Output() onScheduleClient = new EventEmitter<SaveScheduleModel>()
  @Output() onConfirmDelete = new EventEmitter<ClientScheduleAppointmentModel>()

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    @Inject(SERVICES_TOKEN.DIALOG) private readonly dialogManagerService: IDilogManagerService) { }

  get selected(): Date {
    return this._selected
  }

  set selected(selected: Date) {
    if (this._selected.getTime() !== selected.getTime()) {
      this.onDateChange.emit(selected)
      this.buildTable()
      this._selected = selected
    }
  }

  ngOnInit(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }



  ngAfterViewInit(): void {
    if (this.dataSource && this.paginator) {

      this.dataSource.paginator = this.paginator
    }
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['monthSchedule'] && this.monthSchedule) {
      this.buildTable()
    }
  }

  onSubmit(form: NgForm){
    const startAt = new Date(this._selected)
    const endAt = new Date(this._selected)

    startAt.setHours(this.newSchedule.startAt!.getHours(), this.newSchedule.startAt!.getMinutes())
    endAt.setHours(this.newSchedule.endAt!.getHours(), this.newSchedule.endAt!.getMinutes())
    const saved:  ClientScheduleAppointmentModel = {
      id: -1,
      day: this._selected.getDate(),
      startAt,
      endAt,
      clientId: this.newSchedule.clientId!,
      clientName: this.clients.find(c => c.id === this.newSchedule.clientId!)!.name
    }
    this.onScheduleClient.emit(saved)
    this.buildTable()
    form.resetForm()
    this.newSchedule = { startAt: undefined, endAt: undefined, clientId: undefined}
  }

  requestDelete(schedule: ClientScheduleAppointmentModel) {
    this.subscription = this.dialogManagerService.showYesNoDialog(
      YesNoDialogComponent,
      { title: 'Exclusao de agendamento', content: 'Confirma a exclusao do agendamento?' }
    ).subscribe(result => {
      if (result) {
        this.onConfirmDelete.emit(schedule)
        const updatedList = this.dataSource.data.filter(c => c.id !== schedule.id)
        this.dataSource = new MatTableDataSource<ClientScheduleAppointmentModel>(updatedList)
        if (this.paginator) {
          this.dataSource.paginator = this.paginator
        }

      }
    })
  }

  onTimeChange(time: Date) {
    const endAt = new Date(time)
    endAt.setHours(time.getHours() + 1)
    this.newSchedule.endAt = endAt
  }

  private buildTable() {
    const appointments = this.monthSchedule.scheduleAppoitments.filter(a =>
      this.monthSchedule.year === this._selected.getFullYear() &&
      this.monthSchedule.month === this._selected.getMonth() &&
      a.day === this._selected.getDate()
    )
    this.dataSource = new MatTableDataSource<ClientScheduleAppointmentModel>(appointments);
    if (this.paginator) {
      this.dataSource.paginator = this.paginator
    }
  }

}
