// // // src/Features/post_counselor/PostCounselorDashboardContent.jsx
// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import { toast } from "react-toastify";
// // import { format } from "date-fns";
// // import {
// //   AlertTriangle,
// //   CheckCircle,
// //   PhoneCall,
// //   Loader2,
// //   MessageSquare,
// // } from "lucide-react";

// // const MetricCard = ({ title, value, icon, color }) => (
// //   <div
// //     className={`p-5 bg-white rounded-xl shadow-xl border-l-4 border-${color}-600 hover:shadow-2xl transition-all`}
// //   >
// //     <div className="flex items-center">
// //       <div className={`p-3 bg-${color}-600 text-white rounded-lg mr-4`}>
// //         {icon}
// //       </div>
// //       <div>
// //         <p className="text-sm uppercase text-gray-500 font-medium tracking-wider">
// //           {title}
// //         </p>
// //         <p className="text-3xl font-black text-gray-900">{value}</p>
// //       </div>
// //     </div>
// //   </div>
// // );

// // const PostCounselorDashboardContent = () => {
// //   const [pending, setPending] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [sendingId, setSendingId] = useState(null);

// //   const fetchPending = async () => {
// //     try {
// //       setLoading(true);
// //       const { data } = await axios.get("/api/post-counselor/pending");
// //       setPending(data.data || []);
// //     } catch {
// //       toast.error("Failed to load notifications");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchPending();
// //     const interval = setInterval(fetchPending, 15000);
// //     return () => clearInterval(interval);
// //   }, []);

// //   const sendSMS = async (id) => {
// //     setSendingId(id);
// //     try {
// //       await axios.patch(`/api/post-counselor/${id}/mark-sent`);
// //       toast.success("SMS sent successfully!");
// //       fetchPending();
// //     } catch {
// //       toast.error("Failed to send SMS");
// //     } finally {
// //       setSendingId(null);
// //     }
// //   };

// //   return (
// //     <div className="space-y-8">
// //       <div>
// //         <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
// //           Post-Donation Counseling
// //         </h1>
// //         <p className="text-lg text-gray-600">
// //           Send test result notifications to donors via SMS
// //         </p>
// //       </div>

// //       <hr className="border-gray-300" />

// //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
// //         <MetricCard
// //           title="Pending SMS"
// //           value={pending.length}
// //           icon={<MessageSquare className="h-6 w-6" />}
// //           color="red"
// //         />
// //         <MetricCard
// //           title="Reactive"
// //           value={pending.filter((p) => p.hasReactiveResult).length}
// //           icon={<AlertTriangle className="h-6 w-6" />}
// //           color="orange"
// //         />
// //         <MetricCard
// //           title="Safe"
// //           value={pending.filter((p) => !p.hasReactiveResult).length}
// //           icon={<CheckCircle className="h-6 w-6" />}
// //           color="green"
// //         />
// //       </div>

// //       {loading ? (
// //         <div className="flex justify-center py-20">
// //           <Loader2 className="w-16 h-16 animate-spin text-red-600" />
// //         </div>
// //       ) : pending.length === 0 ? (
// //         <div className="text-center py-20 bg-green-50 rounded-2xl">
// //           <CheckCircle className="w-32 h-32 text-green-600 mx-auto mb-6" />
// //           <p className="text-4xl font-bold text-green-700">
// //             All donors notified!
// //           </p>
// //         </div>
// //       ) : (
// //         <div className="space-y-8">
// //           {pending.map((item) => {
// //             const { donation } = item;
// //             const donor = donation.donor;
// //             const isReactive = item.hasReactiveResult;
// //             const donationId = `DON-${donation._id
// //               .toString()
// //               .slice(-6)
// //               .toUpperCase()}`;

// //             return (
// //               <div
// //                 key={item._id}
// //                 className={`bg-white rounded-2xl shadow-xl p-8 border-l-8 ${
// //                   isReactive ? "border-red-600" : "border-green-500"
// //                 }`}
// //               >
// //                 <div className="flex justify-between items-center mb-6">
// //                   <div>
// //                     <h2 className="text-4xl font-black text-gray-800">
// //                       {donationId}
// //                     </h2>
// //                     <p className="text-gray-600">
// //                       Tested:{" "}
// //                       {format(
// //                         new Date(donation.testedAt),
// //                         "dd MMM yyyy, HH:mm"
// //                       )}
// //                     </p>
// //                   </div>
// //                   <span
// //                     className={`text-3xl font-black ${
// //                       isReactive ? "text-red-600" : "text-green-600"
// //                     }`}
// //                   >
// //                     {isReactive ? "REACTIVE" : "SAFE"}
// //                   </span>
// //                 </div>

// //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-lg mb-8">
// //                   <div>
// //                     <strong>Donor:</strong> {donor?.name || "N/A"}
// //                   </div>
// //                   <div className="flex items-center gap-2">
// //                     <PhoneCall className="w-5 h-5" />
// //                     <strong>Phone:</strong> {donor?.phone || "No number"}
// //                   </div>
// //                   <div>
// //                     <strong>Blood Type:</strong>{" "}
// //                     <span className="text-3xl font-bold text-red-600">
// //                       {donation.aboRh}
// //                     </span>
// //                   </div>
// //                 </div>

// //                 <div className="text-right">
// //                   <button
// //                     onClick={() => sendSMS(item._id)}
// //                     disabled={sendingId === item._id || !donor?.phone}
// //                     className={`px-10 py-4 rounded-xl font-bold text-xl shadow-lg transition-all flex items-center gap-3
// //                       ${
// //                         donor?.phone
// //                           ? "bg-blue-600 hover:bg-blue-700 text-white"
// //                           : "bg-gray-400 text-gray-200 cursor-not-allowed"
// //                       }
// //                       ${sendingId === item._id && "animate-pulse"}`}
// //                   >
// //                     {sendingId === item._id ? (
// //                       <>
// //                         <Loader2 className="w-6 h-6 animate-spin" />
// //                         Sending...
// //                       </>
// //                     ) : (
// //                       <>
// //                         <MessageSquare className="w-6 h-6" />
// //                         Send SMS Now
// //                       </>
// //                     )}
// //                   </button>
// //                 </div>
// //               </div>
// //             );
// //           })}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default PostCounselorDashboardContent;
// // src/Features/post_counselor/PostCounselorDashboardContent.jsx
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { format } from "date-fns";
// import {
//   AlertTriangle,
//   CheckCircle,
//   PhoneCall,
//   Loader2,
//   MessageSquare,
// } from "lucide-react";

// const MetricCard = ({ title, value, icon, color }) => (
//   <div
//     className={`p-5 bg-white rounded-xl shadow-xl border-l-4 border-${color}-600 hover:shadow-2xl transition-all`}
//   >
//     <div className="flex items-center">
//       <div className={`p-3 bg-${color}-600 text-white rounded-lg mr-4`}>
//         {icon}
//       </div>
//       <div>
//         <p className="text-sm uppercase text-gray-500 font-medium tracking-wider">
//           {title}
//         </p>
//         <p className="text-3xl font-black text-gray-900">{value}</p>
//       </div>
//     </div>
//   </div>
// );

// const PostCounselorDashboardContent = () => {
//   const [pending, setPending] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [sendingId, setSendingId] = useState(null);

//   const fetchPending = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get("/api/post-counselor/pending");
//       setPending(data.data || []);
//     } catch (err) {
//       toast.error("Failed to load notifications");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPending();
//     const interval = setInterval(fetchPending, 15000);
//     return () => clearInterval(interval);
//   }, []);

//   const sendSMS = async (id) => {
//     setSendingId(id);
//     try {
//       await axios.patch(`/api/post-counselor/${id}/mark-sent`);
//       toast.success("SMS sent successfully!");
//       fetchPending();
//     } catch (err) {
//       toast.error("Failed to send SMS");
//       console.error(err);
//     } finally {
//       setSendingId(null);
//     }
//   };

//   return (
//     <div className="space-y-8">
//       <div>
//         <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
//           Post-Donation Counseling
//         </h1>
//         <p className="text-lg text-gray-600">
//           Send test result notifications to donors via SMS
//         </p>
//       </div>

//       <hr className="border-gray-300" />

//       {/* Metrics */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//         <MetricCard
//           title="Pending SMS"
//           value={pending.length}
//           icon={<MessageSquare className="h-6 w-6" />}
//           color="red"
//         />
//         <MetricCard
//           title="Reactive"
//           value={pending.filter((p) => p.hasReactiveResult).length}
//           icon={<AlertTriangle className="h-6 w-6" />}
//           color="orange"
//         />
//         <MetricCard
//           title="Safe"
//           value={pending.filter((p) => !p.hasReactiveResult).length}
//           icon={<CheckCircle className="h-6 w-6" />}
//           color="green"
//         />
//       </div>

//       {/* Loading & Empty State */}
//       {loading ? (
//         <div className="flex justify-center py-20">
//           <Loader2 className="w-16 h-16 animate-spin text-red-600" />
//         </div>
//       ) : pending.length === 0 ? (
//         <div className="text-center py-20 bg-green-50 rounded-2xl">
//           <CheckCircle className="w-32 h-32 text-green-600 mx-auto mb-6" />
//           <p className="text-4xl font-bold text-green-700">
//             All donors notified!
//           </p>
//         </div>
//       ) : (
//         <div className="space-y-8">
//           {pending.map((item) => {
//             const isReactive = item.hasReactiveResult;
//             const hasPhone = !!item.phone;

//             return (
//               <div
//                 key={item._id}
//                 className={`bg-white rounded-2xl shadow-xl p-8 border-l-8 ${
//                   isReactive ? "border-red-600" : "border-green-500"
//                 }`}
//               >
//                 {/* Header: Donation ID + Status */}
//                 <div className="flex justify-between items-center mb-6">
//                   <div>
//                     <h2 className="text-4xl font-black text-gray-800">
//                       {item.donationId}
//                     </h2>
//                     <p className="text-gray-600">
//                       Tested:{" "}
//                       {format(new Date(item.testedAt), "dd MMM yyyy, HH:mm")}
//                     </p>
//                   </div>
//                   <span
//                     className={`text-3xl font-black ${
//                       isReactive ? "text-red-600" : "text-green-600"
//                     }`}
//                   >
//                     {isReactive ? "REACTIVE" : "SAFE"}
//                   </span>
//                 </div>

//                 {/* Donor Info (Privacy Protected) */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-lg mb-8">
//                   <div>
//                     <strong>Donor:</strong> Anonymous Donor
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <PhoneCall className="w-5 h-5" />
//                     <strong>Phone:</strong> {item.phone || "No number"}
//                   </div>
//                   <div>
//                     <strong>Blood Type:</strong>{" "}
//                     <span className="text-3xl font-bold text-red-600">
//                       {item.aboRh}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Send Button */}
//                 <div className="text-right">
//                   <button
//                     onClick={() => sendSMS(item._id)}
//                     disabled={sendingId === item._id || !hasPhone}
//                     className={`px-10 py-4 rounded-xl font-bold text-xl shadow-lg transition-all flex items-center gap-3 mx-auto md:mx-0
//                       ${
//                         hasPhone
//                           ? "bg-blue-600 hover:bg-blue-700 text-white"
//                           : "bg-gray-400 text-gray-200 cursor-not-allowed"
//                       }
//                       ${sendingId === item._id && "animate-pulse"}`}
//                   >
//                     {sendingId === item._id ? (
//                       <>
//                         <Loader2 className="w-6 h-6 animate-spin" />
//                         Sending...
//                       </>
//                     ) : (
//                       <>
//                         <MessageSquare className="w-6 h-6" />
//                         Send SMS Now
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PostCounselorDashboardContent;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { format } from "date-fns";
import {
  AlertTriangle,
  CheckCircle,
  PhoneCall,
  Loader2,
  MessageSquare,
} from "lucide-react";

// Reusable Metric Card Componen
// ← FIXED: Changed "icon: Icon" to "icon" and use it directly
const MetricCard = ({ title, value, icon, color }) => (
  <div className="p-6 bg-white rounded-2xl shadow-lg border-l-4 border-gray-300 hover:shadow-2xl transition-shadow">
    <div className="flex items-center">
      <div className={`p-4 rounded-xl bg-${color}-100 text-${color}-600 mr-5`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
          {title}
        </p>
        <p className="text-4xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
    </div>
  </div>
);

const PostCounselorDashboardContent = () => {
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sendingId, setSendingId] = useState(null);

  const fetchPending = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/post-counselor/pending", {
        withCredentials: true,
      });
      if (response.data.success) {
        setPending(response.data.data || []);
      } else {
        toast.error("Failed to fetch notifications");
      }
    } catch (err) {
      console.error("Fetch pending error:", err);
      toast.error(err.response?.data?.msg || "Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
    const interval = setInterval(fetchPending, 15000);
    return () => clearInterval(interval);
  }, []);

  const sendSMS = async (id) => {
    if (sendingId) return;
    setSendingId(id);
    try {
      await axios.patch(
        `/api/post-counselor/${id}/mark-sent`,
        {},
        { withCredentials: true }
      );
      toast.success("SMS sent successfully!");
      fetchPending();
    } catch (err) {
      console.error("SMS send error:", err);
      toast.error(
        err.response?.data?.msg || "Failed to send SMS. Check phone number."
      );
    } finally {
      setSendingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="w-16 h-16 animate-spin text-blue-600" />
      </div>
    );
  }

  if (pending.length === 0) {
    return (
      <div className="text-center py-20 bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl">
        <h2 className="text-4xl font-bold text-green-700 mb-4">
          Donor notifications page
        </h2>
        <p className="text-xl text-gray-600">No pending notifications.</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-5xl font-extrabold text-gray-900 mb-3">
          Post-Donation Counseling
        </h1>
        <p className="text-xl text-gray-600">
          Send confidential test result notifications to donors via SMS
        </p>
      </div>
      <hr className="border-gray-300" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <MetricCard
          title="Pending Notifications"
          value={pending.length}
          icon={<MessageSquare className="w-8 h-8" />}
          color="blue"
        />
        <MetricCard
          title="Reactive Results"
          value={pending.filter((p) => p.hasReactiveResult).length}
          icon={<AlertTriangle className="w-8 h-8" />}
          color="red"
        />
        <MetricCard
          title="Safe Results"
          value={pending.filter((p) => !p.hasReactiveResult).length}
          icon={<CheckCircle className="w-8 h-8" />}
          color="green"
        />
      </div>
      <div className="space-y-8">
        {pending.map((item) => {
          const isReactive = item.hasReactiveResult;
          const hasPhone = !!item.phone;
          return (
            <div
              key={item._id}
              className={`bg-white rounded-3xl shadow-2xl overflow-hidden border-l-8 ${
                isReactive ? "border-red-600" : "border-green-500"
              } transition-all hover:shadow-3xl`}
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-5xl font-black text-gray-800 tracking-tight">
                      {item.donationId}
                    </h2>
                    <p className="text-gray-600 text-lg mt-2">
                      Tested on:{" "}
                      {format(new Date(item.testedAt), "dd MMM yyyy, HH:mm")}
                    </p>
                  </div>
                  <div
                    className={`px-8 py-4 rounded-full text-3xl font-bold text-white shadow-lg ${
                      isReactive ? "bg-red-600" : "bg-green-600"
                    }`}
                  >
                    {isReactive ? "REACTIVE" : "SAFE"}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-lg mb-10">
                  <div>
                    <strong className="text-gray-700">Donor:</strong>
                    <span className="ml-3 font-medium">Anonymous Donor</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <PhoneCall className="w-6 h-6 text-blue-600" />
                    <strong className="text-gray-700">Phone:</strong>
                    <span className="font-mono text-lg">
                      {hasPhone ? item.phone : "No number provided"}
                    </span>
                  </div>
                  <div>
                    <strong className="text-gray-700">Blood Type:</strong>
                    <span className="ml-3 text-4xl font-bold text-red-600">
                      {item.aboRh}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <button
                    onClick={() => sendSMS(item._id)}
                    disabled={!hasPhone || sendingId === item._id}
                    className={`inline-flex items-center gap-4 px-12 py-5 rounded-2xl font-bold text-xl shadow-xl transition-all transform hover:scale-105 ${
                      hasPhone
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-gray-400 text-gray-200 cursor-not-allowed"
                    } ${sendingId === item._id ? "animate-pulse" : ""}`}
                  >
                    {sendingId === item._id ? (
                      <>
                        <Loader2 className="w-7 h-7 animate-spin" />
                        Sending SMS...
                      </>
                    ) : (
                      <>
                        <MessageSquare className="w-7 h-7" />
                        Send SMS Now
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PostCounselorDashboardContent;
