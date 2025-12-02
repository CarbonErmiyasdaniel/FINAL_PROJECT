// src/Features/post_counselor/PostCounselorProfile.jsx
const PostCounselorProfile = () => (
  <div className="p-8">
    <h1 className="text-4xl font-extrabold text-gray-900 mb-6">My Profile</h1>
    <div className="bg-white rounded-xl shadow-xl p-10 max-w-2xl">
      <div className="flex items-center gap-6 mb-8">
        <img
          src="https://via.placeholder.com/120"
          className="w-32 h-32 rounded-full border-4 border-red-600"
        />
        <div>
          <h2 className="text-3xl font-bold">Dr. Selamawit Kebede</h2>
          <p className="text-xl text-gray-600">Post-Donation Counselor</p>
          <p className="text-gray-500 mt-2">Debre Berhan Blood Center</p>
        </div>
      </div>
      <div className="space-y-4 text-lg">
        <p>
          <strong>Email:</strong> selamawit@dbbc.org
        </p>
        <p>
          <strong>Phone:</strong> +251 911 234 567
        </p>
        <p>
          <strong>Employee ID:</strong> PC-001
        </p>
      </div>
    </div>
  </div>
);

export default PostCounselorProfile;
