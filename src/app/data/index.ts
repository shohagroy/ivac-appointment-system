import { ISlot } from "@/utils/solts";

export interface Center {
  id: number;
  c_name: string;
  prefix: string;
  is_delete: number;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface Ivac {
  id: number;
  center_info_id: number;
  ivac_name: string;
  address: string;
  prefix: string;
  ceated_on: string; // Fixed the typo here
  visa_fee: number;
  is_delete: number;
  created_at: string;
  updated_at: string;
  app_key: string;
  contact_number: string;
  created_by: string;
  charge: number;
  new_visa_fee: number;
  old_visa_fee: number;
  new_fees_applied_from: string;
  notify_fees_from: string;
  max_notification_count: number;
  allow_old_amount_until_new_date: number;
  notification_text_beside_amount: string;
  notification_text_popup: string;
}

export interface AmountChangeData {
  allow_old_amount_until_new_date: number;
  max_notification_count: number;
  old_visa_fees: number;
  new_fees_applied_from: string;
  notice: boolean;
  notice_short: string;
  notice_popup: string;
  new_visa_fee: number;
}

export interface VisaType {
  id: number;
  type_name: string;
  order: number;
  is_active: number;
  $$hashKey?: string;
}

export interface InfoItem {
  web_id: string;
  web_id_repeat: string;
  passport: string;
  name: string;
  phone: string;
  email: string;
  amount: number;
  captcha: string;
  center: Center;
  is_open?: boolean; // Optional, only in the first info item
  ivac: Ivac;
  amountChangeData: AmountChangeData;
  visa_type: VisaType;
  otp?: string;
  confirm_tos: boolean;
  appointment_time?: string;
  appointment_date?: string;
}

export interface RequestPayload {
  _token: string;
  apiKey: string;
  action: string;
  info: InfoItem[];
  resend?: number;
  payChannel?: string;
  appointment_time?: string;
  otp?: string;
  specific_date?: string;
  selected_payment?: {
    name: string;
    slug: string;
    grand_total: number;
    link: string;
  };
  selected_slot?: ISlot;
}

export const applications: RequestPayload[] = [
  {
    _token: "fNF91EEzQXO4BOUKBU3h4zZqhe9pVVVs0uK4dfr8",
    apiKey: "fNF91EEzQXO4BOUKBU3h4zZqhe9pVVVs0uK4dfr8",
    action: "sendOtp",
    info: [
      {
        web_id: "BGDDW1464B24",
        web_id_repeat: "BGDDW1464B24",
        passport: "",
        name: "MD ASHRAFUL ALAM",
        phone: "01760567555",
        email: "ashrafulalam15286@gmail.com",
        amount: 800.0,
        captcha: "",
        center: {
          id: 1,
          c_name: "Dhaka",
          prefix: "D",
          is_delete: 0,
          created_by: "",
          created_at: "",
          updated_at: "",
        },
        is_open: false,
        ivac: {
          id: 17,
          center_info_id: 1,
          ivac_name: "IVAC, Dhaka (JFP)",
          address: "Jamuna Future Park",
          prefix: "D",
          ceated_on: "2018-07-12 11:58:00",
          visa_fee: 800.0,
          is_delete: 0,
          created_at: "2018-07-12 00:00:00",
          updated_at: "",
          app_key: "IVACJFP",
          contact_number: "",
          created_by: "",
          charge: 3,
          new_visa_fee: 800.0,
          old_visa_fee: 800.0,
          new_fees_applied_from: "2018-08-05 00:00:00",
          notify_fees_from: "2018-07-29 04:54:32",
          max_notification_count: 2,
          allow_old_amount_until_new_date: 2,
          notification_text_beside_amount:
            "(From <from> this IVAC fees will be <new_amount> BDT)",
          notification_text_popup: "",
        },
        amountChangeData: {
          allow_old_amount_until_new_date: 2,
          max_notification_count: 0,
          old_visa_fees: 800.0,
          new_fees_applied_from: "2018-08-05 00:00:00",
          notice: false,
          notice_short: "",
          notice_popup: "",
          new_visa_fee: 800.0,
        },
        visa_type: {
          id: 13,
          type_name: "MEDICAL/MEDICAL ATTENDANT VISA",
          order: 2,
          is_active: 1,
          $$hashKey: "object:50",
        },
        confirm_tos: true,
        otp: "",
      },
      {
        phone: "01760567555",
        email: "ashrafulalam15286@gmail.com",
        center: {
          id: 1,
          c_name: "Dhaka",
          prefix: "D",
          is_delete: 0,
          created_by: "",
          created_at: "",
          updated_at: "",
        },
        web_id: "BGDDW1465624",
        web_id_repeat: "BGDDW1465624",
        ivac: {
          id: 17,
          center_info_id: 1,
          ivac_name: "IVAC, Dhaka (JFP)",
          address: "Jamuna Future Park",
          prefix: "D",
          ceated_on: "2018-07-12 11:58:00",
          visa_fee: 800.0,
          is_delete: 0,
          created_at: "2018-07-12 00:00:00",
          updated_at: "",
          app_key: "IVACJFP",
          contact_number: "",
          created_by: "",
          charge: 3,
          new_visa_fee: 800.0,
          old_visa_fee: 800.0,
          new_fees_applied_from: "2018-08-05 00:00:00",
          notify_fees_from: "2018-07-29 04:54:32",
          max_notification_count: 2,
          allow_old_amount_until_new_date: 2,
          notification_text_beside_amount:
            "(From <from> this IVAC fees will be <new_amount> BDT)",
          notification_text_popup: "",
        },
        amount: 800.0,
        amountChangeData: {
          allow_old_amount_until_new_date: 2,
          max_notification_count: 0,
          old_visa_fees: 800.0,
          new_fees_applied_from: "2018-08-05 00:00:00",
          notice: false,
          notice_short: "",
          notice_popup: "",
          new_visa_fee: 800.0,
        },
        visa_type: {
          id: 13,
          type_name: "MEDICAL/MEDICAL ATTENDANT VISA",
          order: 2,
          is_active: 1,
          $$hashKey: "object:50",
        },
        name: "ANJU HOSSAIN",
        is_open: true,
      },
    ],
    resend: 0,
  },

  {
    _token: "fNF91EEzQXO4BOUKBU3h4zZqhe9pVVVs0uK4dfr8",
    apiKey: "fNF91EEzQXO4BOUKBU3h4zZqhe9pVVVs0uK4dfr8",
    action: "sendOtp",
    info: [
      {
        web_id: "BGDDW17DE124",
        web_id_repeat: "BGDDW17DE124",
        passport: "",
        name: "S M SALIM SARWAR",
        phone: "01770710013",
        email: "sarwarrgp28@gmail.com",
        amount: 800.0,
        captcha: "",
        center: {
          id: 1,
          c_name: "Dhaka",
          prefix: "D",
          is_delete: 0,
          created_by: "",
          created_at: "",
          updated_at: "",
        },
        is_open: true,
        ivac: {
          id: 17,
          center_info_id: 1,
          ivac_name: "IVAC, Dhaka (JFP)",
          address: "Jamuna Future Park",
          prefix: "D",
          ceated_on: "2018-07-12 11:58:00",
          visa_fee: 800.0,
          is_delete: 0,
          created_at: "2018-07-12 00:00:00",
          updated_at: "",
          app_key: "IVACJFP",
          contact_number: "",
          created_by: "",
          charge: 3,
          new_visa_fee: 800.0,
          old_visa_fee: 800.0,
          new_fees_applied_from: "2018-08-05 00:00:00",
          notify_fees_from: "2018-07-29 04:54:32",
          max_notification_count: 2,
          allow_old_amount_until_new_date: 2,
          notification_text_beside_amount:
            "(From <from> this IVAC fees will be <new_amount> BDT)",
          notification_text_popup: "",
        },
        amountChangeData: {
          allow_old_amount_until_new_date: 2,
          max_notification_count: 0,
          old_visa_fees: 800.0,
          new_fees_applied_from: "2018-08-05 00:00:00",
          notice: false,
          notice_short: "",
          notice_popup: "",
          new_visa_fee: 800.0,
        },
        visa_type: {
          id: 13,
          type_name: "MEDICAL/MEDICAL ATTENDANT VISA",
          order: 2,
          is_active: 1,
          $$hashKey: "object:50",
        },
        confirm_tos: true,
      },
    ],
    resend: 0,
  },
];

const generateInvoiceData = {
  apiKey: "UaFcvFTGc6HQAeOKp1muVFizXiAjg90p4s4ueY66",
  action: "generateInvoice",
  amount: "10.00",
  ivac_id: 2,
  visa_type: 6,
  payChannel: "",
  info: [
    {
      web_id: "BGDRW1465624",
      web_id_repeat: "BGDRW1465624",
      passport: "",
      name: "ANJU HOSSAIN",
      phone: "01760567555",
      email: "ashrafulalam15286@gmail.com",
      amount: "800.00",
      captcha: "",
      center: {
        id: 3,
        c_name: "Rajshahi",
        prefix: "R",
        is_delete: 0,
        created_by: "",
        created_at: "",
        updated_at: "",
      },
      is_open: true,
      ivac: {
        id: 2,
        center_info_id: 3,
        ivac_name: "IVAC, RAJSHAHI",
        address:
          "Morium Ali Tower, Holding No-18, Plot No-557, 1ST Floor, Old Bilsimla, Greater Road, Barnali More, 1ST Floor, Ward No-10, Rajshahi.",
        prefix: "R",
        ceated_on: "2017-08-30 19:06:20",
        visa_fee: "800.00",
        is_delete: 0,
        created_at: "",
        updated_at: "",
        app_key: "IVACRAJSHAHI",
        contact_number: "",
        created_by: "",
        charge: 3,
        new_visa_fee: "800.00",
        old_visa_fee: "800.00",
        new_fees_applied_from: "2018-08-05 00:00:00",
        notify_fees_from: "2018-07-29 04:54:32",
        max_notification_count: 2,
        allow_old_amount_until_new_date: 2,
        notification_text_beside_amount:
          "(From <from> this IVAC fees will be <new_amount> BDT)",
        notification_text_popup: "",
      },
      amountChangeData: {
        allow_old_amount_until_new_date: 2,
        max_notification_count: 0,
        old_visa_fees: "800.00",
        new_fees_applied_from: "2018-08-05 00:00:00",
        notice: false,
        notice_short: "",
        notice_popup: "",
        new_visa_fee: "800.00",
      },
      visa_type: {
        id: 6,
        type_name: "ENTRY VISA",
        order: 5,
        is_active: 1,
        $$hashKey: "object:51",
      },
      confirm_tos: true,
    },
  ],
};

const timeSlotData = {
  apiKey: "RLVlxzniwHJLVKxT1FQWNQjcMVakHWdoFCInI6sQ",
  action: "generateSlotTime",
  amount: "10.00",
  ivac_id: 17,
  visa_type: 13,
  specific_date: "",
  info: [
    {
      web_id: "BGDDW17DE124",
      web_id_repeat: "BGDDW17DE124",
      passport: "",
      name: "S M SALIM SARWAR",
      phone: "01760567555",
      email: "sarwarrgp28@gmail.com",
      amount: "800.00",
      captcha: "",
      center: {
        id: 1,
        c_name: "Dhaka",
        prefix: "D",
        is_delete: 0,
        created_by: "",
        created_at: "",
        updated_at: "",
      },
      is_open: true,
      ivac: {
        id: 17,
        center_info_id: 1,
        ivac_name: "IVAC, Dhaka (JFP)",
        address: "Jamuna Future Park",
        prefix: "D",
        ceated_on: "2018-07-12 11:58:00",
        visa_fee: "800.00",
        is_delete: 0,
        created_at: "2018-07-12 00:00:00",
        updated_at: "",
        app_key: "IVACJFP",
        contact_number: "",
        created_by: "",
        charge: 3,
        new_visa_fee: "800.00",
        old_visa_fee: "800.00",
        new_fees_applied_from: "2018-08-05 00:00:00",
        notify_fees_from: "2018-07-29 04:54:32",
        max_notification_count: 2,
        allow_old_amount_until_new_date: 2,
        notification_text_beside_amount:
          "(From <from> this IVAC fees will be <new_amount> BDT)",
        notification_text_popup: "",
      },
      amountChangeData: {
        allow_old_amount_until_new_date: 2,
        max_notification_count: 0,
        old_visa_fees: "800.00",
        new_fees_applied_from: "2018-08-05 00:00:00",
        notice: false,
        notice_short: "",
        notice_popup: "",
        new_visa_fee: "800.00",
      },
      visa_type: {
        id: 13,
        type_name: "MEDICAL/MEDICAL ATTENDANT VISA",
        order: 2,
        is_active: 1,
        $$hashKey: "object:50",
      },
      confirm_tos: true,
      otp: "471761",
      appointment_time: "",
    },
  ],
};
