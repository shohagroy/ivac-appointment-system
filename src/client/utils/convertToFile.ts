// import { AppointmentFile } from "@prisma/client";

// const convertAppointmentFile = (str: string): AppointmentFile => {
//   const lines = str.split("\n");

//   const result: AppointmentFile = {
//     _token: "",
//     apiKey: "",
//     action: "",
//     info: [],
//     resend: "",
//   };

//   lines.forEach((line) => {
//     if (line.includes(":")) {
//       const [key, value] = line.split(":").map((part) => part.trim());

//       // Handle nested arrays or objects like "info[0]"
//       const matches = key.match(/(\w+)(\[(\d+)\])?(\[(\w+)\])?/);

//       if (matches) {
//         const mainKey = matches[1] as keyof AppointmentFile; // Main property (e.g., 'info')
//         const index = matches[3] ? parseInt(matches[3], 10) : undefined; // Index for the array if exists
//         const nestedKey = matches[5]; // Nested property if it exists

//         // Initialize the nested array and object structure
//         if (index !== undefined) {
//           if (!result[mainKey]) {
//             result[mainKey] = []; // Initialize if not already an array
//           }
//           if (!result[mainKey][index]) {
//             result[mainKey][index] = {}; // Initialize the object for that index
//           }

//           // Assign the value to the nested property
//           if (nestedKey) {
//             (result[mainKey][index] as any)[nestedKey] = value; // Directly assign to the nested key
//           } else {
//             // No nested key, assign the value directly to the object
//             (result[mainKey][index] as any)[mainKey] = value; // Assign to the main key
//           }
//         } else {
//           // Handle normal key-value pairs for non-array properties
//           (result as any)[mainKey] = value; // Using 'any' for dynamic property assignment
//         }
//       }
//     }
//   });

//   return result;
// };

// export default convertAppointmentFile;
