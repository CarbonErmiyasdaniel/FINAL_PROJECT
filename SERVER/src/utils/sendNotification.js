// // // utils/sendNotification.js
// // import twilio from "twilio";

// // const twilioClient = twilio(
// //   process.env.TWILIO_ACCOUNT_SID,
// //   process.env.TWILIO_AUTH_TOKEN
// // );

// // const generateSMSTemplate = (donorName, donationId, isReactive) => {
// //   const base = `Dear ${
// //     donorName || "Donor"
// //   },\n\nThank you for your blood donation (${donationId}).\n\n`;
// //   if (isReactive) {
// //     return (
// //       base +
// //       "Important: Please contact us regarding your test results for a confidential discussion. Call: +1 (555) 123-4567.\n\n— LifeBlood Team"
// //     );
// //   }
// //   return (
// //     base +
// //     "Your blood is safe and helping save lives! Donate again in 3 months.\n\n— LifeBlood Team"
// //   );
// // };

// // export const sendDonorNotification = async (
// //   donor,
// //   donationId,
// //   isReactive,
// //   screeningTests
// // ) => {
// //   const name = donor.name?.split(" ")[0] || "Donor";
// //   const phone = donor.phone;
// //   const results = [];

// //   if (phone) {
// //     try {
// //       await twilioClient.messages.create({
// //         body: generateSMSTemplate(name, donationId, isReactive),
// //         from: process.env.TWILIO_PHONE_NUMBER,
// //         to: phone,
// //       });
// //       results.push({ channel: "SMS", status: "sent", to: phone });
// //     } catch (err) {
// //       console.error("SMS failed:", err.message);
// //       results.push({ channel: "SMS", status: "failed", error: err.message });
// //     }
// //   } else {
// //     results.push({
// //       channel: "SMS",
// //       status: "skipped",
// //       reason: "No phone provided",
// //     });
// //   }

// //   return results;
// // };
// // utils/sendNotification.js
// import twilio from "twilio";

// const twilioClient = twilio(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );

// const normalizePhone = (phone) => {
//   if (!phone) return null;

//   let cleaned = phone.toString().trim().replace(/\s+/g, "");

//   // Remove any non-digit except leading +
//   cleaned = cleaned.replace(/[^\d+]/g, "");

//   // Cases:
//   if (cleaned.startsWith("+251")) return cleaned; // Already good
//   if (cleaned.startsWith("251")) return "+" + cleaned; // Missing +
//   if (cleaned.startsWith("0")) return "+251" + cleaned.slice(1); // 09... → +2519...
//   if (cleaned.length === 9) return "+251" + cleaned; // 912... → +251912...
//   if (cleaned.startsWith("+")) return cleaned; // Some other country
//   if (/^\d{9,15}$/.test(cleaned)) return "+251" + cleaned; // Fallback

//   return null; // Invalid
// };

// const generateSMSTemplate = (
//   donorName,
//   donationId,
//   isReactive,
//   reactiveTests = []
// ) => {
//   const name = donorName?.split(" ")[0] || "Donor";
//   const base = `Dear ${name},\n\nThank you for donating blood (${donationId})\n\n`;

//   if (isReactive) {
//     const tests =
//       reactiveTests.length > 0 ? reactiveTests.join(", ") : "one or more tests";

//     return `${base}Important: Your test result showed reactive for ${tests}.\n\nPlease visit the blood bank as soon as possible for confidential counseling.\n\nYour health matters to us.\n\n— Blood Bank Team`;
//   }

//   return `${base}Good news! Your blood is SAFE and ready to save lives.\n\nThank you! We hope to see you again after 3 months.\n\n— Blood Bank Team`;
// };

// export const sendDonorNotification = async (
//   donor,
//   donationId,
//   hasReactiveResult,
//   screeningTests = {}
// ) => {
//   const name = donor.name || "Donor";
//   const rawPhone = donor.phone;
//   const results = [];

//   const phone = normalizePhone(rawPhone);

//   if (!phone) {
//     results.push({
//       channel: "SMS",
//       status: "failed",
//       to: rawPhone,
//       error: "Invalid or missing phone number",
//     });
//     return results;
//   }

//   // Determine which tests were reactive
//   const reactiveTests = Object.entries(screeningTests || {})
//     .filter(([_, result]) => ["Positive", "Inconclusive"].includes(result))
//     .map(([test]) => {
//       return test
//         .replace("hiv", "HIV")
//         .replace("hepatitisB", "Hepatitis B")
//         .replace("hepatitisC", "Hepatitis C")
//         .replace("syphilis", "Syphilis");
//     });

//   const message = generateSMSTemplate(
//     name,
//     donationId,
//     hasReactiveResult,
//     reactiveTests
//   );

//   try {
//     const twilioRes = await twilioClient.messages.create({
//       body: message,
//       from: process.env.TWILIO_PHONE_NUMBER,
//       to: phone,
//     });

//     results.push({
//       channel: "SMS",
//       status: "sent",
//       to: phone,
//       sid: twilioRes.sid,
//     });

//     console.log(
//       `SMS sent to ${phone} | Donation: ${donationId} | SID: ${twilioRes.sid}`
//     );
//   } catch (err) {
//     console.error("Twilio SMS failed:", err.message);
//     results.push({
//       channel: "SMS",
//       status: "failed",
//       to: phone,
//       error: err.message,
//     });
//   }

//   return results;
// };
// utils/sendNotification.js

// import twilio from "twilio";

// const twilioClient = twilio(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );

// const normalizePhone = (phone) => {
//   if (!phone) return null;
//   let cleaned = phone
//     .toString()
//     .trim()
//     .replace(/\s+/g, "")
//     .replace(/[^\d+]/g, "");

//   if (cleaned.startsWith("+251")) return cleaned;
//   if (cleaned.startsWith("251")) return "+" + cleaned;
//   if (cleaned.startsWith("0")) return "+251" + cleaned.slice(1);
//   if (cleaned.length === 9) return "+251" + cleaned;
//   return null;
// };

// const generateSMSTemplate = (
//   donorName,
//   donationId,
//   isReactive,
//   reactiveTests = []
// ) => {
//   const name = donorName?.split(" ")[0] || "ደም ለጋሽ";

//   if (!isReactive) {
//     return `ሰላም ${name}!\n እናመሰግናለን።\nየደምዎ አይነት: ${donationId}\nየ3 ሰዎችን ሕይወት አትርፏል!\n\nደ/ብርሃን ደ/ባንክ`;
//   }

//   const tests = reactiveTests.length > 0 ? reactiveTests.join(", ") : "በፈተናው";
//   return `ሰላም ${name},\n እናመሰግናለን።\nRef: ${donationId}\nየፈተና ውጤትዎ ${tests}ይመርመሩ።\nደ/ብርሃን ደ/ባንክ`;
// };

// export const sendDonorNotification = async (
//   donor,
//   donationId,
//   hasReactiveResult,
//   screeningTests = {}
// ) => {
//   const rawPhone = donor.phone;
//   const phone = normalizePhone(rawPhone);

//   const reactiveTests = Object.entries(screeningTests)
//     .filter(([_, result]) => ["Positive", "Inconclusive"].includes(result))
//     .map(([test]) => {
//       const map = {
//         hiv: "HIV",
//         hepatitisB: "ሄፐታይቲስ B",
//         hepatitisC: "ሄፐታይቲስ C",
//         syphilis: "ሲፍሊስ",
//       };
//       return map[test] || test;
//     });

//   const message = generateSMSTemplate(
//     donor.name,
//     donationId,
//     hasReactiveResult,
//     reactiveTests
//   );

//   // Debug log (remove in production if you want)
//   console.log("Sending SMS to:", phone);
//   console.log("Message:", message);

//   if (!phone) {
//     return [{ status: "failed", error: "Invalid phone number" }];
//   }

//   try {
//     const twilioRes = await twilioClient.messages.create({
//       body: message,
//       from: process.env.TWILIO_PHONE_NUMBER,
//       to: phone,
//     });

//     return [{ status: "sent", sid: twilioRes.sid, to: phone }];
//   } catch (err) {
//     console.error("Twilio Error:", err.message);
//     return [{ status: "failed", error: err.message, to: phone }];
//   }
// };
// //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// // utils/sendNotification.js
// //kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
// import twilio from "twilio";

// const twilioClient = twilio(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );

// Fix Ethiopian phone numbers
// const normalizePhone = (phone) => {
//   if (!phone) return null;
//   let p = phone
//     .toString()
//     .trim()
//     .replace(/[^\d+]/g, "");
//   if (p.startsWith("+251")) return p;
//   if (p.startsWith("251")) return "+" + p;
//   if (p.startsWith("0")) return "+251" + p.slice(1);
//   if (p.length === 9) return "+251" + p;
//   return null;
// };

// // VERY SHORT Amharic messages – less than 110 characters
// const generateSMSTemplate = (donorName, donationId, isReactive) => {
//   const name = (donorName?.split(" ")[0] || "ደም ለጋሽ").slice(0, 8);

//   if (!isReactive) {
//     return `ሰላም ${name}!\nደምዎ ደህና ነው!\nእናመሰግናለን!\nደብረ ብርሃን ደም ባንክ`;
//   }

//   return `ሰላም ${name},\nየፈተና ውጤትዎ ችግር አሳይቷል።\nእባክዎን በቶሎ ይምጡ!\nደብረ ብርሃን ደም ባንክ`;
// };

// export const sendDonorNotification = async (
//   donor,
//   donationId,
//   hasReactiveResult,
//   screeningTests = {}
// ) => {
//   const phone = normalizePhone(donor.phone);

//   if (!phone) {
//     return [{ status: "failed", error: "No valid phone" }];
//   }

//   const message = generateSMSTemplate(
//     donor.name,
//     donationId,
//     hasReactiveResult
//   );

//   console.log("Sending to:", phone);
//   console.log("Message:", message);

//   try {
//     const result = await twilioClient.messages.create({
//       body: message,
//       from: process.env.TWILIO_PHONE_NUMBER,
//       to: phone,
//     });

//     console.log("SMS Sent! SID:", result.sid);
//     return [{ status: "sent", sid: result.sid }];
//   } catch (error) {
//     console.error("Twilio failed:", error.message);
//     return [{ status: "failed", error: error.message }];
//   }
// };
// //kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
// import twilio from "twilio";

// const twilioClient = twilio(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );

// // Fix Ethiopian phone numbers
// const normalizePhone = (phone) => {
//   if (!phone) return null;
//   let p = phone
//     .toString()
//     .trim()
//     .replace(/[^\d+]/g, "");
//   if (p.startsWith("+251")) return p;
//   if (p.startsWith("251")) return "+" + p;
//   if (p.startsWith("0")) return "+251" + p.slice(1);
//   if (p.length === 9) return "+251" + p;
//   return null;
// };

// // VERY SHORT Amharic messages – less than 110 characters
// // MODIFIED: Added bloodType parameter
// const generateSMSTemplate = (donorName, donationId, isReactive, bloodType) => {
//   const name = (donorName?.split(" ")[0] || "ደም ለጋሽ").slice(0, 8);
//   // Use the bloodType passed from the controller, defaulting to a placeholder if empty
//   const type = bloodType || "NA";

//   // Appending the blood type ("የደምዎ አይነት: [type]") to both messages
//   if (!isReactive) {
//     // Message for non-reactive/safe results
//     // Example: ሰላም [Name]! የደምዎ አይነት: A+. ደምዎ ደህና ነው! እናመሰግናለን! ደብረ ብርሃን ደም ባንክ
//     return `ሰላም ${name}!\nየደምዎ አይነት: ${type}\nደምዎ ደህና ነው!\nእናመሰግናለን!\nደብረ ብርሃን ደም ባንክ`;
//   }

//   // Message for reactive/problematic results
//   // Example: ሰላም [Name], የደምዎ አይነት: A+. የፈተና ውጤትዎ ችግር አሳይቷል። እባክዎን በቶሎ ይምጡ! ደብረ ብርሃን ደም ባንክ
//   return `ሰላም ${name},\nየደምዎ አይነት: ${type}\nየፈተና ውጤትዎ ችግር አሳይቷል።\nእባክዎን በቶሎ ይምጡ!\nደብረ ብርሃን ደም ባንክ`;
// };

// // MODIFIED: Added bloodType parameter to the export
// export const sendDonorNotification = async (
//   donor,
//   donationId,
//   hasReactiveResult,
//   screeningTests = {},
//   bloodType // New parameter for blood type
// ) => {
//   const phone = normalizePhone(donor.phone);

//   if (!phone) {
//     return [{ status: "failed", error: "No valid phone" }];
//   }

//   // Pass bloodType to the template generator
//   const message = generateSMSTemplate(
//     donor.name,
//     donationId,
//     hasReactiveResult,
//     bloodType
//   );

//   console.log("Sending to:", phone);
//   console.log("Message:", message);

//   try {
//     const result = await twilioClient.messages.create({
//       body: message,
//       from: process.env.TWILIO_PHONE_NUMBER,
//       to: phone,
//     });

//     console.log("SMS Sent! SID:", result.sid);
//     return [{ status: "sent", sid: result.sid }];
//   } catch (error) {
//     console.error("Twilio failed:", error.message);
//     return [{ status: "failed", error: error.message }];
//   }
// };
// kjhgfdsadf9oiopu

import twilio from "twilio";

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const normalizePhone = (phone) => {
  if (!phone) return null;
  let cleaned = phone
    .toString()
    .trim()
    .replace(/\s+/g, "")
    .replace(/[^\d+]/g, "");

  if (cleaned.startsWith("+251")) return cleaned;
  if (cleaned.startsWith("251")) return "+" + cleaned;
  if (cleaned.startsWith("0")) return "+251" + cleaned.slice(1);
  if (cleaned.length === 9) return "+251" + cleaned;
  return null;
};

// ✂️ MINIMIZED Amharic messages
// Signature now expects bloodType as the 4th argument
const generateSMSTemplate = (
  donorName,
  donationId,
  isReactive,
  bloodType, // <--- Correct 4th argument
  reactiveTests = []
) => {
  const name = (donorName?.split(" ")[0] || "ደም ለጋሽ").slice(0, 8);
  const type = bloodType || "NA";
  const typeDisplay = `(${type})`;

  if (!isReactive) {
    // SAFE Result (Minimized): [Name] ([Type]): Your blood is safe. D/Birhan B/Bank
    return `ሰላም ${name} እናመሰግናለን።\nየደምዎ አይነት ${typeDisplay}፡ ደምዎ ደህና ነው፡፡\nደ/ብርሃን ደ/ባንክ`;
  }

  // REACTIVE Result (Minimized): [Name] ([Type]): Your result showed a problem. Come quickly.
  const tests = reactiveTests.length > 0 ? reactiveTests.join(", ") : "በፈተናው";

  // NOTE: This reactive message prioritizes urgency over showing the blood type due to minimal space.
  // I've kept your previous reactive logic but removed the blood type to maintain the minimal size.
  // To include blood type in the reactive message, you would need more characters.
  return `ሰላም ${name},\n እናመሰግናለን።\nየደምዎ አይነት ${typeDisplay}\nውጤትዎ ${tests}ይመርመሩ።\nደ/ብርሃን ደ/ባንክ`;
};

// MODIFIED: The function signature now includes bloodType as the 5th argument
export const sendDonorNotification = async (
  donor,
  donationId,
  hasReactiveResult,
  screeningTests = {},
  bloodType // <--- New 5th parameter for the blood type
) => {
  const rawPhone = donor.phone;
  const phone = normalizePhone(rawPhone);

  const reactiveTests = Object.entries(screeningTests)
    .filter(([_, result]) => ["Positive", "Inconclusive"].includes(result))
    .map(([test]) => {
      const map = {
        hiv: "HIV",
        hepatitisB: "ሄፐታይቲስ B",
        hepatitisC: "ሄፐታይቲስ C",
        syphilis: "ሲፍሊስ",
      };
      return map[test] || test;
    });

  if (!phone) {
    return [{ status: "failed", error: "Invalid phone number" }];
  }

  // Call template generator: PASSING bloodType as the 4th argument
  const message = generateSMSTemplate(
    donor.name,
    donationId,
    hasReactiveResult,
    bloodType, // <--- Passed from the 5th argument of the export function
    reactiveTests
  );

  console.log("Sending SMS to:", phone);
  console.log("Message:", message);

  try {
    const twilioRes = await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });

    return [{ status: "sent", sid: twilioRes.sid, to: phone }];
  } catch (err) {
    console.error("Twilio Error:", err.message);
    return [{ status: "failed", error: err.message, to: phone }];
  }
};
