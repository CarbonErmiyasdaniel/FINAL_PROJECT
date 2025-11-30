import { useEffect, useRef, useState } from "react";
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
  User,
} from "lucide-react";

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
  "SNNPR",
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
      .regex(/^(\+251|0)?[79]\d{8}$/, "Invalid phone format")
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

const UpdateDonorPersonalInfo = ({ donorId, donorData, onSuccess }) => {
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(false);
  const sigCanvas = useRef(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: donorData?.title || "Ato",
      fatherName: donorData?.fatherName || "",
      surname: donorData?.surname || "",
      dateOfBirth: donorData?.dateOfBirth
        ? donorData.dateOfBirth.split("T")[0]
        : "",
      sex: donorData?.sex || "Male",
      occupation: donorData?.occupation || "",
      contact: {
        region: donorData?.address?.region || "Amhara",
        zone: donorData?.address?.zone || "",
        woreda: donorData?.address?.woreda || "",
        kebele: donorData?.address?.kebele || "",
        subCity: donorData?.address?.subCity || "",
        houseNumber: donorData?.address?.houseNumber || "",
        cellphone: donorData?.contact?.mobile || "+251",
        telephone: donorData?.contact?.telephone || "",
        pobox: donorData?.contact?.pobox || "",
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
    if (!donorId) return toast.error("Donor ID missing!");

    // Optional: require new signature on update
    let signature = donorData?.donorSignature;
    if (!sigCanvas.current?.isEmpty()) {
      signature = sigCanvas.current.toDataURL("image/png");
    }

    setLoading(true);
    try {
      await axios.put(
        `/api/nurses/updateDonorInfo/${donorId}`,
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

      toast.success("Donor information updated successfully!");
      if (onSuccess) onSuccess();
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <Card className="border-t-4 border-red-700 shadow-2xl">
          <CardHeader className="bg-red-700 text-white text-center py-8">
            <CardTitle className="text-4xl font-bold flex items-center justify-center gap-4">
              <UserPen className="w-12 h-12" /> Update Donor Information
            </CardTitle>
            <p className="mt-4 text-2xl">
              Debre Berhan Blood Bank • ID: <strong>{donorId}</strong>
            </p>
          </CardHeader>

          <CardContent className="pt-10">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-10"
              >
                {/* Personal Info */}
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
                          <Input {...field} />
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
                          <Input {...field} />
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
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="occupation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Occupation</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
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
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {["woreda", "kebele", "subCity"].map((field) => (
                        <FormField
                          key={field}
                          control={form.control}
                          name={`contact.${field}`}
                          render={({ field: f }) => (
                            <FormItem>
                              <FormLabel>
                                {field === "woreda"
                                  ? "Woreda"
                                  : field === "kebele"
                                  ? "Kebele"
                                  : "Sub-City (Opt)"}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...f}
                                  placeholder={
                                    field === "subCity" ? "Optional" : ""
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>

                    <FormField
                      control={form.control}
                      name="contact.houseNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>House Number (Optional)</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Contact */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="contact.cellphone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mobile Phone</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
                        <FormLabel>Landline (Opt)</FormLabel>
                        <Input {...field} />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contact.pobox"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>P.O. Box (Opt)</FormLabel>
                        <Input {...field} />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Optional New Signature */}
                <div className="border-2 border-dashed rounded-xl p-8 bg-amber-50">
                  <Label className="text-xl font-bold mb-4 block text-amber-800">
                    Update Signature (Optional)
                  </Label>
                  <p className="text-sm text-gray-600 mb-4">
                    Leave blank to keep current signature
                  </p>
                  <SignaturePad
                    ref={sigCanvas}
                    canvasProps={{
                      className:
                        "w-full h-72 bg-white border-2 border-amber-300 rounded-lg cursor-crosshair",
                    }}
                    options={{ minWidth: 2, maxWidth: 4, penColor: "black" }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-6"
                    onClick={() => sigCanvas.current?.clear()}
                  >
                    Clear New Signature
                  </Button>
                </div>

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={loading}
                    className="flex-1 bg-green-700 hover:bg-green-800 text-2xl py-8"
                  >
                    {loading ? (
                      <>
                        Updating...{" "}
                        <Loader2 className="ml-4 h-8 w-8 animate-spin" />
                      </>
                    ) : (
                      <>
                        Update Donor Info <UserPen className="ml-4 h-8 w-8" />
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => window.history.back()}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UpdateDonorPersonalInfo;
