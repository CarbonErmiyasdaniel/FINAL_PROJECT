// import React, { useEffect, useRef, useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import axios from "axios";
// import { toast } from "react-toastify";
// import SignaturePad from "react-signature-pad-wrapper";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import {
//   Loader2,
//   UserPen,
//   Home,
//   Phone,
//   Calendar,
//   MapPin,
//   IdCard,
//   User,
//   CheckCircle2,
//   XCircle,
// } from "lucide-react";

// // Full Ethiopian Regions Data
// const REGIONS_DATA = [
//   {
//     name: "Addis Ababa",
//     zones: [
//       {
//         name: "Addis Ababa",
//         woredas: [
//           {
//             name: "Bole",
//             kebeles: [
//               "01",
//               "02",
//               "03",
//               "04",
//               "05",
//               "06",
//               "07",
//               "08",
//               "09",
//               "10",
//             ],
//           },
//           {
//             name: "Yeka",
//             kebeles: [
//               "01",
//               "02",
//               "03",
//               "04",
//               "05",
//               "06",
//               "07",
//               "08",
//               "09",
//               "10",
//             ],
//           },
//           { name: "Arada", kebeles: ["01", "02", "03", "04", "05"] },
//           { name: "Kirkos", kebeles: ["01", "02", "03", "04", "05"] },
//           { name: "Lideta", kebeles: ["01", "02", "03"] },
//           { name: "Kolfe Keranio", kebeles: ["01", "02", "03", "04", "05"] },
//           { name: "Nifas Silk-Lafto", kebeles: ["01", "02", "03", "04", "05"] },
//           { name: "Akaky Kaliti", kebeles: ["01", "02", "03"] },
//           { name: "Gullele", kebeles: ["01", "02", "03", "04"] },
//           { name: "Addis Ketema", kebeles: ["01", "02", "03", "04", "05"] },
//         ],
//       },
//     ],
//   },
//   {
//     name: "Amhara",
//     zones: [
//       {
//         name: "North Gonder",
//         woredas: [
//           { name: "Gonder Zuria", kebeles: ["01", "02", "03", "04"] },
//           { name: "Debark", kebeles: ["01", "02", "03"] },
//         ],
//       },
//       {
//         name: "South Wollo",
//         woredas: [
//           { name: "Dessie Zuria", kebeles: ["01", "02", "03"] },
//           { name: "Kombolcha", kebeles: ["01", "02", "03", "04"] },
//         ],
//       },
//     ],
//   },
//   // Add all other regions here if needed
// ];

// const occupations = [
//   "Teacher",
//   "Farmer",
//   "Doctor",
//   "Engineer",
//   "Nurse",
//   "Driver",
//   "Merchant",
//   "Government Employee",
//   "Student",
//   "Housewife",
//   "Unemployed",
//   "Other",
// ];

// const formSchema = z.object({
//   title: z.string().min(1, "Title required"),
//   fatherName: z.string().min(2, "Father's name required"),
//   surname: z.string().min(2, "Surname required"),
//   dateOfBirth: z.string().min(1, "Date of birth required"),
//   sex: z.enum(["Male", "Female"]),
//   occupation: z.string().min(1, "Occupation required"),
//   contact: z.object({
//     region: z.string().min(1, "Region required"),
//     zone: z.string().min(1, "Zone required"),
//     woreda: z.string().min(1, "Woreda required"),
//     kebele: z.string().min(1, "Kebele required"),
//     subCity: z.string().optional(),
//     houseNumber: z.string().optional(),
//     cellphone: z
//       .string()
//       .regex(/^(\+251|0)?[79]\d{8}$/, "Use +251912345678 or 0912345678")
//       .transform((v) =>
//         v.startsWith("0")
//           ? "+251" + v.slice(1)
//           : v.startsWith("+251")
//           ? v
//           : "+251" + v
//       ),
//     telephone: z.string().optional(),
//     pobox: z.string().optional(),
//   }),
// });

// const RegisterDonorPersonalInfo = ({ userId, donorName = "Donor" }) => {
//   const [regions] = useState(REGIONS_DATA);
//   const [zones, setZones] = useState([]);
//   const [woredas, setWoredas] = useState([]);
//   const [kebeles, setKebeles] = useState([]);
//   const [age, setAge] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [registeredDonor, setRegisteredDonor] = useState(null);
//   const sigCanvas = useRef(null);

//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       title: "Ato",
//       fatherName: "",
//       surname: "",
//       dateOfBirth: "",
//       sex: "Male",
//       occupation: "",
//       contact: {
//         region: "",
//         zone: "",
//         woreda: "",
//         kebele: "",
//         subCity: "",
//         houseNumber: "",
//         cellphone: "+251",
//         telephone: "",
//         pobox: "",
//       },
//     },
//   });

//   // Auto calculate age
//   const dob = form.watch("dateOfBirth");
//   useEffect(() => {
//     if (!dob) return setAge("");
//     const birth = new Date(dob);
//     const today = new Date();
//     let age = today.getFullYear() - birth.getFullYear();
//     const m = today.getMonth() - birth.getMonth();
//     if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
//     setAge(age >= 0 ? age.toString() : "");
//   }, [dob]);

//   // Cascading address selects
//   const region = form.watch("contact.region");
//   const zone = form.watch("contact.zone");
//   const woreda = form.watch("contact.woreda");

//   useEffect(() => {
//     if (region) {
//       const r = regions.find((r) => r.name === region);
//       setZones(r?.zones || []);
//       setWoredas([]);
//       setKebeles([]);
//       form.setValue("contact.zone", "");
//       form.setValue("contact.woreda", "");
//       form.setValue("contact.kebele", "");
//     }
//   }, [region, regions, form]);

//   useEffect(() => {
//     if (zone) {
//       const z = zones.find((z) => z.name === zone);
//       setWoredas(z?.woredas || []);
//       setKebeles([]);
//       form.setValue("contact.woreda", "");
//       form.setValue("contact.kebele", "");
//     }
//   }, [zone, zones, form]);

//   useEffect(() => {
//     if (woreda) {
//       const w = woredas.find((w) => w.name === woreda);
//       setKebeles(w?.kebeles || []);
//       form.setValue("contact.kebele", "");
//     }
//   }, [woreda, woredas, form]);

//   const onSubmit = async (data) => {
//     if (!userId) {
//       toast.error("Donor ID missing!");
//       return;
//     }
//     if (sigCanvas.current?.isEmpty()) {
//       toast.error("Please provide donor signature");
//       return;
//     }

//     const signature = sigCanvas.current.toDataURL("image/png");
//     setLoading(true);

//     try {
//       const res = await axios.post(
//         `/api/nurses/registerDonorInfo/${userId}`,
//         {
//           title: data.title,
//           fatherName: data.fatherName,
//           surname: data.surname,
//           dateOfBirth: data.dateOfBirth,
//           sex: data.sex,
//           occupation: data.occupation,
//           donorSignature: signature,
//           address: {
//             region: data.contact.region,
//             zone: data.contact.zone,
//             woreda: data.contact.woreda,
//             kebele: data.contact.kebele,
//             subCity: data.contact.subCity || undefined,
//             houseNumber: data.contact.houseNumber || undefined,
//           },
//           contact: {
//             mobile: data.contact.cellphone,
//             telephone: data.contact.telephone || undefined,
//             pobox: data.contact.pobox || undefined,
//           },
//         },
//         { withCredentials: true }
//       );

//       const fullName =
//         `${data.title} ${donorName} ${data.fatherName} ${data.surname}`.trim();

//       setRegisteredDonor({
//         donorNumber: res.data.donorNumber,
//         fullName,
//         dateOfBirth: data.dateOfBirth,
//         sex: data.sex,
//         mobile: data.contact.cellphone,
//         region: data.contact.region,
//       });

//       toast.success(
//         <div className="flex items-center gap-3">
//           <CheckCircle2 className="w-8 h-8 text-green-600" />
//           <div>
//             <p className="font-bold text-lg">Donor Registered Successfully!</p>
//             <p className="text-base">
//               Donor Number: <strong>{res.data.donorNumber}</strong>
//             </p>
//           </div>
//         </div>,
//         { autoClose: 10000 }
//       );
//     } catch (err) {
//       const msg = err.response?.data?.message || "Registration failed";
//       toast.error(
//         <div className="flex items-center gap-3">
//           <XCircle className="w-8 h-8 text-red-600" />
//           <div>
//             <p className="font-bold">Registration Failed</p>
//             <p>{msg}</p>
//           </div>
//         </div>
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // SUCCESS CARD - DONOR NUMBER AT THE VERY TOP + NO "Register Another" BUTTON
//   if (registeredDonor) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center py-12 px-4">
//         <div className="max-w-4xl w-full">
//           <Card className="overflow-hidden shadow-2xl border-t-12 border-red-700">
//             {/* DONOR NUMBER - HUGE AND AT THE TOP */}
//             <div className="bg-red-700 text-white py-24 text-center">
//               <IdCard className="w-36 h-36 mx-auto mb-8 opacity-90" />
//               <h1 className="text-9xl md:text-[10rem] font-extrabold tracking-widest drop-shadow-2xl leading-none">
//                 {registeredDonor.donorNumber}
//               </h1>
//               <p className="text-4xl md:text-5xl font-bold mt-10">
//                 Debre Berhan Blood Bank
//               </p>
//               <p className="text-2xl mt-4 opacity-90">
//                 Official Donor Registration
//               </p>
//             </div>

//             <CardContent className="p-12 space-y-12">
//               <div className="text-center">
//                 <h2 className="text-5xl md:text-6xl font-bold text-gray-800 leading-tight">
//                   {registeredDonor.fullName}
//                 </h2>
//                 <p className="text-3xl md:text-4xl text-green-600 font-bold mt-8 flex items-center justify-center gap-4">
//                   <CheckCircle2 className="w-14 h-14" />
//                   Successfully Registered
//                 </p>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left text-xl">
//                 <div className="flex gap-5">
//                   <Calendar className="w-10 h-10 text-red-600 mt-1" />
//                   <div>
//                     <p className="font-semibold text-gray-600">Date of Birth</p>
//                     <p className="text-2xl md:text-3xl font-bold">
//                       {new Date(registeredDonor.dateOfBirth).toLocaleDateString(
//                         "en-GB"
//                       )}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex gap-5">
//                   <User className="w-10 h-10 text-red-600 mt-1" />
//                   <div>
//                     <p className="font-semibold text-gray-600">Sex</p>
//                     <p className="text-2xl md:text-3xl font-bold">
//                       {registeredDonor.sex}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex gap-5">
//                   <Phone className="w-10 h-10 text-red-600 mt-1" />
//                   <div>
//                     <p className="font-semibold text-gray-600">Mobile</p>
//                     <p className="text-2xl md:text-3xl font-bold">
//                       {registeredDonor.mobile}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex gap-5">
//                   <MapPin className="w-10 h-10 text-red-600 mt-1" />
//                   <div>
//                     <p className="font-semibold text-gray-600">Region</p>
//                     <p className="text-2xl md:text-3xl font-bold">
//                       {registeredDonor.region}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* No button - registration is final */}
//               <div className="text-center pt-10">
//                 <p className="text-xl text-gray-700">
//                   Registration is complete. You may now close this window.
//                 </p>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     );
//   }

//   // MAIN REGISTRATION FORM
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-red-50 to-white py-8">
//       <div className="max-w-6xl mx-auto px-4">
//         <Card className="border-t-4 border-red-700 shadow-2xl">
//           <CardHeader className="bg-red-700 text-white text-center py-8">
//             <CardTitle className="text-4xl font-bold flex items-center justify-center gap-4">
//               <UserPen className="w-12 h-12" />
//               Donor Registration
//             </CardTitle>
//             <p className="mt-4 text-2xl">
//               Debre Berhan Blood Bank • Donor: <strong>{donorName}</strong>
//             </p>
//           </CardHeader>

//           <CardContent className="pt-10">
//             <Form {...form}>
//               <form
//                 onSubmit={form.handleSubmit(onSubmit)}
//                 className="space-y-10"
//               >
//                 {/* PERSONAL INFORMATION */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                   <FormField
//                     control={form.control}
//                     name="title"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Title</FormLabel>
//                         <Select
//                           onValueChange={field.onChange}
//                           defaultValue={field.value}
//                         >
//                           <FormControl>
//                             <SelectTrigger>
//                               <SelectValue />
//                             </SelectTrigger>
//                           </FormControl>
//                           <SelectContent>
//                             {[
//                               "Ato",
//                               "W/ro",
//                               "W/t",
//                               "Dr.",
//                               "Mr.",
//                               "Mrs.",
//                               "Ms.",
//                             ].map((t) => (
//                               <SelectItem key={t} value={t}>
//                                 {t}
//                               </SelectItem>
//                             ))}
//                           </SelectContent>
//                         </Select>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={form.control}
//                     name="fatherName"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Father's Name</FormLabel>
//                         <FormControl>
//                           <Input placeholder="Kebede" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={form.control}
//                     name="surname"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Surname</FormLabel>
//                         <FormControl>
//                           <Input placeholder="Tadesse" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>

//                 {/* DOB, AGE, SEX, OCCUPATION */}
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//                   <FormField
//                     control={form.control}
//                     name="dateOfBirth"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Date of Birth</FormLabel>
//                         <FormControl>
//                           <Input type="date" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <div className="flex items-end">
//                     <div className="w-full">
//                       <Label>Age</Label>
//                       <Input
//                         value={age}
//                         disabled
//                         className="bg-gray-100 font-bold text-xl"
//                       />
//                     </div>
//                   </div>

//                   <FormField
//                     control={form.control}
//                     name="sex"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Sex</FormLabel>
//                         <Select
//                           onValueChange={field.onChange}
//                           defaultValue={field.value}
//                         >
//                           <FormControl>
//                             <SelectTrigger>
//                               <SelectValue />
//                             </SelectTrigger>
//                           </FormControl>
//                           <SelectContent>
//                             <SelectItem value="Male">Male</SelectItem>
//                             <SelectItem value="Female">Female</SelectItem>
//                           </SelectContent>
//                         </Select>
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={form.control}
//                     name="occupation"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Occupation</FormLabel>
//                         <Select onValueChange={field.onChange}>
//                           <FormControl>
//                             <SelectTrigger>
//                               <SelectValue placeholder="Select" />
//                             </SelectTrigger>
//                           </FormControl>
//                           <SelectContent>
//                             {occupations.map((job) => (
//                               <SelectItem key={job} value={job}>
//                                 {job}
//                               </SelectItem>
//                             ))}
//                           </SelectContent>
//                         </Select>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>

//                 {/* ADDRESS */}
//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="flex items-center gap-2">
//                       <Home className="w-6 h-6" /> Address
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                       <FormField
//                         control={form.control}
//                         name="contact.region"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Region</FormLabel>
//                             <Select
//                               onValueChange={field.onChange}
//                               value={field.value}
//                             >
//                               <FormControl>
//                                 <SelectTrigger>
//                                   <SelectValue placeholder="Select Region" />
//                                 </SelectTrigger>
//                               </FormControl>
//                               <SelectContent>
//                                 {regions.map((r) => (
//                                   <SelectItem key={r.name} value={r.name}>
//                                     {r.name}
//                                   </SelectItem>
//                                 ))}
//                               </SelectContent>
//                             </Select>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />

//                       <FormField
//                         control={form.control}
//                         name="contact.zone"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Zone</FormLabel>
//                             <Select
//                               onValueChange={field.onChange}
//                               value={field.value}
//                               disabled={!zones.length}
//                             >
//                               <FormControl>
//                                 <SelectTrigger>
//                                   <SelectValue
//                                     placeholder={
//                                       zones.length
//                                         ? "Select Zone"
//                                         : "Select region first"
//                                     }
//                                   />
//                                 </SelectTrigger>
//                               </FormControl>
//                               <SelectContent>
//                                 {zones.map((z) => (
//                                   <SelectItem key={z.name} value={z.name}>
//                                     {z.name}
//                                   </SelectItem>
//                                 ))}
//                               </SelectContent>
//                             </Select>
//                           </FormItem>
//                         )}
//                       />

//                       <FormField
//                         control={form.control}
//                         name="contact.woreda"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Woreda</FormLabel>
//                             <Select
//                               onValueChange={field.onChange}
//                               value={field.value}
//                               disabled={!woredas.length}
//                             >
//                               <FormControl>
//                                 <SelectTrigger>
//                                   <SelectValue
//                                     placeholder={
//                                       woredas.length
//                                         ? "Select Woreda"
//                                         : "Select zone first"
//                                     }
//                                   />
//                                 </SelectTrigger>
//                               </FormControl>
//                               <SelectContent>
//                                 {woredas.map((w) => (
//                                   <SelectItem key={w.name} value={w.name}>
//                                     {w.name}
//                                   </SelectItem>
//                                 ))}
//                               </SelectContent>
//                             </Select>
//                           </FormItem>
//                         )}
//                       />

//                       <FormField
//                         control={form.control}
//                         name="contact.kebele"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Kebele</FormLabel>
//                             <Select
//                               onValueChange={field.onChange}
//                               value={field.value}
//                               disabled={!kebeles.length}
//                             >
//                               <FormControl>
//                                 <SelectTrigger>
//                                   <SelectValue
//                                     placeholder={
//                                       kebeles.length
//                                         ? "Select Kebele"
//                                         : "Select woreda first"
//                                     }
//                                   />
//                                 </SelectTrigger>
//                               </FormControl>
//                               <SelectContent>
//                                 {kebeles.map((k, i) => (
//                                   <SelectItem key={i} value={k}>
//                                     {k}
//                                   </SelectItem>
//                                 ))}
//                               </SelectContent>
//                             </Select>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                     </div>

//                     <div className="grid grid-cols-2 gap-4 mt-6">
//                       <FormField
//                         control={form.control}
//                         name="contact.subCity"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Sub-City (Addis only)</FormLabel>
//                             <Input placeholder="Bole, Yeka..." {...field} />
//                           </FormItem>
//                         )}
//                       />
//                       <FormField
//                         control={form.control}
//                         name="contact.houseNumber"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>House Number</FormLabel>
//                             <Input placeholder="1234" {...field} />
//                           </FormItem>
//                         )}
//                       />
//                     </div>
//                   </CardContent>
//                 </Card>

//                 {/* CONTACT */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                   <FormField
//                     control={form.control}
//                     name="contact.cellphone"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Mobile Phone</FormLabel>
//                         <FormControl>
//                           <Input placeholder="+251912345678" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="contact.telephone"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Landline (Optional)</FormLabel>
//                         <Input placeholder="0111234567" {...field} />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="contact.pobox"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>P.O. Box</FormLabel>
//                         <Input placeholder="1000" {...field} />
//                       </FormItem>
//                     )}
//                   />
//                 </div>

//                 {/* SIGNATURE */}
//                 <div className="border-2 border-dashed rounded-xl p-8 bg-gray-50">
//                   <Label className="text-xl font-bold mb-4 block">
//                     Donor Signature{" "}
//                     <span className="text-red-600">(Required)</span>
//                   </Label>
//                   <SignaturePad
//                     ref={sigCanvas}
//                     canvasProps={{
//                       className:
//                         "w-full h-72 bg-white border-2 border-gray-300 rounded-lg cursor-crosshair",
//                     }}
//                     options={{
//                       minWidth: 2,
//                       maxWidth: 4,
//                       penColor: "black",
//                       backgroundColor: "rgb(255,255,255)",
//                     }}
//                   />
//                   <Button
//                     type="button"
//                     variant="outline"
//                     size="lg"
//                     onClick={() => sigCanvas.current?.clear()}
//                     className="mt-6 w-full max-w-md"
//                   >
//                     Clear Signature
//                   </Button>
//                 </div>

//                 {/* SUBMIT */}
//                 <Button
//                   type="submit"
//                   size="lg"
//                   disabled={loading}
//                   className="w-full bg-red-700 hover:bg-red-800 text-2xl font-bold py-10"
//                 >
//                   {loading ? (
//                     <>
//                       Saving Donor...{" "}
//                       <Loader2 className="ml-4 h-8 w-8 animate-spin" />
//                     </>
//                   ) : (
//                     <>
//                       Register Donor <UserPen className="ml-4 h-8 w-8" />
//                     </>
//                   )}
//                 </Button>
//               </form>
//             </Form>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default RegisterDonorPersonalInfo;
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { toast } from "react-toastify";
import SignaturePad from "react-signature-pad-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Loader2,
  UserPen,
  Home,
  Phone,
  Calendar,
  MapPin,
  IdCard,
  User,
  CheckCircle2,
} from "lucide-react";

// Only regions — nurse types everything else
const REGIONS = [
  "Addis Ababa",
  "Afar",
  "Amhara",
  "Benishangul-Gumuz",
  "Dire Dawa",
  "Gambela",
  "Harari",
  "Oromia",
  "Sidama",
  "Somali",
  "South West Ethiopia Peoples",
  "Southern Nations, Nationalities, and Peoples' (SNNPR)",
  "Tigray",
];

const occupations = [
  "Teacher",
  "Farmer",
  "Doctor",
  "Engineer",
  "Nurse",
  "Driver",
  "Merchant",
  "Government Employee",
  "Student",
  "Housewife",
  "Unemployed",
  "Other",
];

const formSchema = z.object({
  title: z.string().min(1, "Title required"),
  fatherName: z.string().min(2, "Father's name required"),
  surname: z.string().min(2, "Surname required"),
  dateOfBirth: z.string().min(1, "Date of birth required"),
  sex: z.enum(["Male", "Female"]),
  occupation: z.string().min(1, "Occupation required"),
  contact: z.object({
    region: z.string().min(1, "Region required"),
    zone: z.string().min(1, "Zone required"),
    woreda: z.string().min(1, "Woreda required"),
    kebele: z.string().min(1, "Kebele required"),
    subCity: z.string().optional(),
    houseNumber: z.string().optional(),
    cellphone: z
      .string()
      .regex(/^(\+251|0)?[79]\d{8}$/, "Use +251912345678 or 0912345678")
      .transform((v) =>
        v.startsWith("0")
          ? "+251" + v.slice(1)
          : v.startsWith("+251")
          ? v
          : "+251" + v
      ),
    telephone: z.string().optional(),
    pobox: z.string().optional(),
  }),
});

const RegisterDonorPersonalInfo = ({ userId, donorName = "Donor" }) => {
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(false);
  const [registeredDonor, setRegisteredDonor] = useState(null);
  const sigCanvas = useRef(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "Ato",
      fatherName: "",
      surname: "",
      dateOfBirth: "",
      sex: "Male",
      occupation: "",
      contact: {
        region: "Amhara",
        zone: "",
        woreda: "",
        kebele: "",
        subCity: "",
        houseNumber: "",
        cellphone: "+251",
        telephone: "",
        pobox: "",
      },
    },
  });

  // Auto calculate age
  const dob = form.watch("dateOfBirth");
  useEffect(() => {
    if (!dob) return setAge("");
    const birth = new Date(dob);
    const today = new Date();
    let calculatedAge = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate()))
      calculatedAge--;
    setAge(calculatedAge >= 0 ? calculatedAge.toString() : "");
  }, [dob]);

  const onSubmit = async (data) => {
    if (!userId) return toast.error("Donor ID missing!");
    if (sigCanvas.current?.isEmpty())
      return toast.error("Please provide donor signature");

    const signature = sigCanvas.current.toDataURL("image/png");
    setLoading(true);

    try {
      const res = await axios.post(
        `/api/nurses/registerDonorInfo/${userId}`,
        {
          title: data.title,
          fatherName: data.fatherName,
          surname: data.surname,
          dateOfBirth: data.dateOfBirth,
          sex: data.sex,
          occupation: data.occupation,
          donorSignature: signature,
          address: {
            region: data.contact.region,
            zone: data.contact.zone,
            woreda: data.contact.woreda,
            kebele: data.contact.kebele,
            subCity: data.contact.subCity || undefined,
            houseNumber: data.contact.houseNumber || undefined,
          },
          contact: {
            mobile: data.contact.cellphone,
            telephone: data.contact.telephone || undefined,
            pobox: data.contact.pobox || undefined,
          },
        },
        { withCredentials: true }
      );

      const fullName =
        `${data.title} ${donorName} ${data.fatherName} ${data.surname}`.trim();

      setRegisteredDonor({
        donorNumber: res.data.donorNumber,
        fullName,
        dateOfBirth: data.dateOfBirth,
        sex: data.sex,
        mobile: data.contact.cellphone,
        region: data.contact.region,
      });

      toast.success("Donor registered successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // SUCCESS SCREEN - FULLY FIXED JSX
  if (registeredDonor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center py-12 px-4">
        <div className="max-w-4xl w-full">
          <Card className="overflow-hidden shadow-2xl border-t-12 border-red-700">
            {/* Header with Donor Number */}
            <div className="bg-red-700 text-white py-24 text-center">
              <IdCard className="w-36 h-36 mx-auto mb-8 opacity-90" />
              <h1 className="text-9xl md:text-[10rem] font-extrabold tracking-widest drop-shadow-2xl">
                {registeredDonor.donorNumber}
              </h1>
              <p className="text-5xl font-bold mt-10">
                Debre Berhan Blood Bank
              </p>
              <p className="text-2xl mt-4 opacity-90">
                Official Donor Registration
              </p>
            </div>

            {/* Body */}
            <CardContent className="p-12 space-y-12">
              <div className="text-center">
                <h2 className="text-6xl font-bold text-gray-800">
                  {registeredDonor.fullName}
                </h2>
                <p className="text-4xl text-green-600 font-bold mt-8 flex items-center justify-center gap-4">
                  <CheckCircle2 className="w-14 h-14" />
                  Successfully Registered
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-xl">
                <div className="flex gap-5">
                  <Calendar className="w-10 h-10 text-red-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-600">Date of Birth</p>
                    <p className="text-3xl font-bold">
                      {new Date(registeredDonor.dateOfBirth).toLocaleDateString(
                        "en-GB"
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <User className="w-10 h-10 text-red-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-600">Sex</p>
                    <p className="text-3xl font-bold">{registeredDonor.sex}</p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <Phone className="w-10 h-10 text-red-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-600">Mobile</p>
                    <p className="text-3xl font-bold">
                      {registeredDonor.mobile}
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <MapPin className="w-10 h-10 text-red-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-600">Region</p>
                    <p className="text-3xl font-bold">
                      {registeredDonor.region}
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center pt-10">
                <p className="text-xl text-gray-700">
                  Registration complete. Thank you for saving lives!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // MAIN FORM
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <Card className="border-t-4 border-red-700 shadow-2xl">
          <CardHeader className="bg-red-700 text-white text-center py-8">
            <CardTitle className="text-4xl font-bold flex items-center justify-center gap-4">
              <UserPen className="w-12 h-12" /> Donor Registration
            </CardTitle>
            <p className="mt-4 text-2xl">
              Debre Berhan Blood Bank • Donor: <strong>{donorName}</strong>
            </p>
          </CardHeader>

          <CardContent className="pt-10">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-10"
              >
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[
                              "Ato",
                              "W/ro",
                              "W/t",
                              "Dr.",
                              "Mr.",
                              "Mrs.",
                              "Ms.",
                            ].map((t) => (
                              <SelectItem key={t} value={t}>
                                {t}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="fatherName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Father's Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Kebede" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="surname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Surname</FormLabel>
                        <FormControl>
                          <Input placeholder="Tadesse" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* DOB, Age, Sex, Occupation */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of Birth</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-end">
                    <div className="w-full">
                      <Label>Age</Label>
                      <Input
                        value={age}
                        disabled
                        className="bg-gray-100 font-bold text-xl"
                      />
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="sex"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sex</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="occupation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Occupation</FormLabel>
                        <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select occupation" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {occupations.map((job) => (
                              <SelectItem key={job} value={job}>
                                {job}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Address */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Home className="w-6 h-6" /> Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="contact.region"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Region</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {REGIONS.map((r) => (
                                  <SelectItem key={r} value={r}>
                                    {r}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="contact.zone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Zone</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g. North Shewa"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="contact.woreda"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Woreda</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g. Debre Berhan Town..."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="contact.kebele"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Kebele</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. 08" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="contact.subCity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sub-City (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="Optional" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="contact.houseNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>House Number (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="1234" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="contact.cellphone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mobile Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="+251912345678" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contact.telephone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Landline (Optional)</FormLabel>
                        <Input placeholder="0111234567" {...field} />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contact.pobox"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>P.O. Box (Optional)</FormLabel>
                        <Input placeholder="1000" {...field} />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Signature */}
                <div className="border-2 border-dashed rounded-xl p-8 bg-gray-50">
                  <Label className="text-xl font-bold mb-4 block">
                    Donor Signature{" "}
                    <span className="text-red-600">(Required)</span>
                  </Label>
                  <SignaturePad
                    ref={sigCanvas}
                    canvasProps={{
                      className:
                        "w-full h-72 bg-white border-2 border-gray-300 rounded-lg cursor-crosshair",
                    }}
                    options={{ minWidth: 2, maxWidth: 4, penColor: "black" }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => sigCanvas.current?.clear()}
                    className="mt-6 w-full max-w-md"
                  >
                    Clear Signature
                  </Button>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={loading}
                  className="w-full bg-red-700 hover:bg-red-800 text-2xl font-bold py-10"
                >
                  {loading ? (
                    <>
                      Saving Donor...{" "}
                      <Loader2 className="ml-4 h-8 w-8 animate-spin" />
                    </>
                  ) : (
                    <>
                      Register Donor <UserPen className="ml-4 h-8 w-8" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterDonorPersonalInfo;
