
export interface ScheduleAppointmentMonthResponse {
    year: number,
    month: number
    scheduledAppoitments: ClientScheduleAppointmentResponse[]
}

export interface ClientScheduleAppointmentResponse {
    id: number
    day: number
    startAt: Date
    endAt: Date
    clientId: number
    clientName: string
}

export interface SaveScheduleResponse {
    starAt: Date
    endAt: Date
    clientId: number
}

export interface SaveScheduleRequest {
    startAt: Date
    endAt: Date
    clientId: number
}