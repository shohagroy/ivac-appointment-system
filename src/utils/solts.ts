export interface ISlot {
  id: number;
  ivac_id: number;
  visa_type: number;
  hour: number;
  date: string;
  availableSlot: number;
  time_display: string;
}

export interface ISlotsSuccessResponse {
  status: "OK" | "FAIL" | "ERROR" | string;
  data: string[];
  slot_dates: string[];
  slot_times: ISlot[];
}

export const slotsNotFoundResponse: ISlotsSuccessResponse = {
  status: "OK",
  data: [],
  slot_dates: [],
  slot_times: [],
};

export const slotsSuccessResponse: ISlotsSuccessResponse = {
  status: "OK",
  data: [""],
  slot_dates: ["2024-10-17"],
  slot_times: [
    {
      id: 142049,
      ivac_id: 17,
      visa_type: 13,
      hour: 10,
      date: "2024-10-17",
      availableSlot: 1,
      time_display: "10:00 - 10:59",
    },
  ],
};
