// // // src/utils/generateDonorNumber.js
// // import PersonalInfo from "../models/PersonalInfo.js";

// // export const generateDonorNumber = async () => {
// //   try {
// //     const today = new Date();
// //     const gregMonth = today.getMonth() + 1;
// //     const ethYear =
// //       gregMonth >= 9 ? today.getFullYear() - 7 : today.getFullYear() - 8;
// //     const prefix = ethYear.toString().slice(-2); // e.g., "18" for 2018 EC

// //     // THIS IS THE ONLY SAFE WAY — Atomic increment using findOneAndUpdate with upsert
// //     const result = await PersonalInfo.findOneAndUpdate(
// //       { donorNumber: { $regex: `^${prefix}` } }, // match any donor from this year
// //       { $inc: { seqCounter: 1 } }, // increment the counter
// //       {
// //         sort: { seqCounter: -1 },
// //         upsert: true, // create document if not exists
// //         new: true, // return the updated document
// //         setDefaultsOnInsert: true,
// //       }
// //     );

// //     const nextSeq = (result.seqCounter || 0) + 1;
// //     const donorNumber = `${prefix}${String(nextSeq).padStart(4, "0")}`;

// //     return donorNumber; // → 180001, 180002, 180003...
// //   } catch (error) {
// //     console.error("Failed to generate donor number:", error);
// //     throw new Error("Could not generate donor number. Try again.");
// //   }
// // };
// // src/utils/generateDonorNumber.js
// import Counter from "../models/Counter.js";

// export const generateDonorNumber = async () => {
//   try {
//     const today = new Date();
//     const gregMonth = today.getMonth() + 1;
//     const ethYear =
//       gregMonth >= 9 ? today.getFullYear() - 7 : today.getFullYear() - 8;
//     const yearPrefix = ethYear.toString().slice(-2); // "18" for 2018 EC
//     const counterId = `donor_${ethYear}`; // Unique per Ethiopian year

//     // This is ATOMIC and safe under high concurrency
//     const counter = await Counter.findByIdAndUpdate(
//       counterId,
//       { $inc: { seq: 1 } },
//       { new: true, upsert: true, setDefaultsOnInsert: true }
//     );

//     const sequence = counter.seq;
//     const donorNumber = `${yearPrefix}${String(sequence).padStart(4, "0")}`;

//     return donorNumber; // e.g., 180001, 180002, ...
//   } catch (error) {
//     console.error("Failed to generate donor number:", error);
//     throw new Error("Could not generate donor number. Please try again.");
//   }
// };

// utils/generateDonorNumber.js
import Counter from "../models/Counter.js";

const getEthiopianYear = () => {
  const today = new Date();
  const month = today.getMonth() + 1; // 1–12
  const year = today.getFullYear();
  return month >= 9 ? year - 7 : year - 8; // Sept = new year in Ethiopia
};

export const generateDonorNumber = async () => {
  const ethYear = getEthiopianYear();
  const yearPrefix = ethYear.toString().slice(-2); // "18" for 2018 EC
  const counterId = `donor_${ethYear}`;

  try {
    const counter = await Counter.findByIdAndUpdate(
      counterId,
      { $inc: { seq: 1 } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    const seq = counter.seq;
    return `${yearPrefix}${String(seq).padStart(4, "0")}`; // → 180001, 180002...
  } catch (err) {
    throw new Error("Failed to generate donor number");
  }
};
