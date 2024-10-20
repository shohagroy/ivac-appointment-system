export const center = [
  {
    id: 1,
    c_name: "Dhaka",
    prefix: "D",
    is_delete: 0,
    created_by: "",
    created_at: "",
    updated_at: "",
  },
];

export const ivac = [
  {
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
];

export const visa = [
  {
    id: 13,
    type_name: "MEDICAL/MEDICAL ATTENDANT VISA",
    order: 2,
    is_active: 1,
    $$hashKey: "object:50",
  },
];

export const centerOptions = center.map((c) => ({
  value: c.id,
  label: c.c_name,
}));

export const ivacOptions = ivac.map((c) => ({
  value: c.id,
  label: c.ivac_name,
}));

export const visaOptions = visa.map((c) => ({
  value: c.id,
  label: c.type_name,
}));
