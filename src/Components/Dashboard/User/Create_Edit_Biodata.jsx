import React, { useContext, useEffect, useState } from "react";
import { Typography, Input, Select, Option, Button } from "@material-tailwind/react";
import { AuthContext } from "../../../Providers/AuthProvider";
import toast, { Toaster } from 'react-hot-toast';
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Create_Edit_Biodata = () => {
  const { user } = useContext(AuthContext)
  const [biodataType, setBiodataType] = useState("");
  const [race, setRace] = useState("");
  const [occupation, setOccupation] = useState("");
  const [permanentDivision, setPermanentDivision] = useState("");
  const [presentDivision, setPresentDivision] = useState("");
  const axiosPublic = useAxiosPublic();
  const [biodata, setBiodata] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosPublic.get(`/get-create-edit-biodata/${user.email}`)
        .then(response => {
          if (response.data) {
            setBiodata(response.data);
          }
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching biodata:", error);
          setLoading(false);
        });
    }
  }, [user?.email, axiosPublic]);


  const handleSubmit = async (e) => {

    e.preventDefault();
    const form = e.target;
    const formData = {
      name: form.name.value,
      biodataType,
      profileImage: form.profileImage.value,
      dob: form.dob.value,
      height: form.height.value,
      weight: form.weight.value,
      age: form.age.value,
      occupation,
      race,
      fathersName: form.fathersName.value,
      mothersName: form.mothersName.value,
      permanentDivision,
      presentDivision,
      expectedPartnerAge: form.expectedPartnerAge.value,
      expectedPartnerHeight: form.expectedPartnerHeight.value,
      expectedPartnerWeight: form.expectedPartnerWeight.value,
      email: form.email.value,
      mobile: form.mobile.value,
    };

    //   try {
    //     const response = await axiosPublic.post('/create-edit-biodata', formData);
    //     const { biodataId } = response.data;
    //     toast.success(`Biodata submitted successfully! Your ID is ${biodataId}`);
    //   } catch (error) {
    //     toast.error('Failed to submit biodata. Please try again.');
    //     console.error('Error submitting biodata:', error);
    //   }

    //   console.log(formData);
    // };

    try {
      if (biodata) {
        await axiosPublic.patch(`/update-biodata/${user.email}`, formData);
        toast.success("Biodata updated successfully!");
      } else {
        const response=await axiosPublic.post('/create-edit-biodata', formData);
        const { biodataId } = response.data;
        toast.success(`Biodata submitted successfully! Your ID is ${biodataId}`);
      }
      setBiodata(formData);
    } catch (error) {
      toast.error("Failed to submit biodata. Please try again.");
      console.error("Error submitting biodata:", error);
    }
  };


  return (
    <section className="flex justify-center items-center ">
      <div className="w-full max-w-6xl mb-10">
        <Toaster position="top-right" reverseOrder={false} />
        <Typography variant="h1" color="blue-gray" className="mb-3 text-center gloock-regular">
          Create/Edit Biodata
        </Typography>
        <Typography variant="lead" color="blue-gray" className="mb-4 text-center gilda-display-regular">
          Personal Information and Family Details"
        </Typography>
        <form onSubmit={handleSubmit} className="grid gap-8 grid-cols-1 md:grid-cols-2 mt-10">
          {/* Name */}
          <div>
            <label htmlFor="name">
              <Typography variant="small" className="mb-2 block font-medium text-gray-900">
                Name
              </Typography>
            </label>
            <Input
              id="name"
              color="gray"
              size="lg"
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full"
              defaultValue={biodata?.name || ""}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email">
              <Typography variant="small" className="mb-2 block font-medium text-gray-900">
                Email
              </Typography>
            </label>
            <Input
              id="email"
              color="gray"
              size="lg"
              type="email"
              name="email"
              placeholder="name@mail.com"
              className="w-full"
              value={user?.email || ""}
              disabled
            />
          </div>

          {/* Biodata Type */}
          <div>
            <label htmlFor="biodataType">
              <Typography variant="small" className="mb-2 block font-medium text-gray-900">
                Biodata Type
              </Typography>
            </label>
            <Select
              defaultValue={biodata?.biodataType || ""}
              id="biodataType"
              name="biodataType"
              color="gray"
              size="lg"
              value={biodataType}
              onChange={(value) => setBiodataType(value)}
            >
              <Option value="" >
                Pick one
              </Option>
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
            </Select>
          </div>

          {/* Profile Image Link */}
          <div>
            <label htmlFor="profileImage">
              <Typography variant="small" className="mb-2 block font-medium text-gray-900">
                Profile Image Link
              </Typography>
            </label>
            <Input
              defaultValue={biodata?.profileImage || ""}
              id="profileImage"
              color="gray"
              size="lg"
              type="url"
              name="profileImage"
              placeholder="Image URL"
              className="w-full"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label htmlFor="dob">
              <Typography variant="small" className="mb-2 block font-medium text-gray-900">
                Date of Birth
              </Typography>
            </label>
            <Input
              defaultValue={biodata?.dob || ""}
              id="dob"
              color="gray"
              size="lg"
              type="date"
              name="dob"
              className="w-full"
            />
          </div>

          {/* Height */}
          <div>
            <label htmlFor="height">
              <Typography variant="small" className="mb-2 block font-medium text-gray-900">
                Height
              </Typography>
            </label>
            <Input
              defaultValue={biodata?.height || ""}
              id="height"
              color="gray"
              size="lg"
              type="text"
              name="height"
              placeholder="Height in cm"
              className="w-full"
            />
          </div>

          {/* Weight */}
          <div>
            <label htmlFor="weight">
              <Typography variant="small" className="mb-2 block font-medium text-gray-900">
                Weight
              </Typography>
            </label>
            <Input
              defaultValue={biodata?.weight || ""}
              id="weight"
              color="gray"
              size="lg"
              type="text"
              name="weight"
              placeholder="Weight in kg"
              className="w-full"
            />
          </div>

          {/* Age */}
          <div>
            <label htmlFor="age">
              <Typography variant="small" className="mb-2 block font-medium text-gray-900">
                Age
              </Typography>
            </label>
            <Input
              defaultValue={biodata?.age || ""}
              id="age"
              color="gray"
              size="lg"
              type="number"
              name="age"
              placeholder="Age"
              className="w-full"
            />
          </div>

          {/* Occupation */}
          <div>
            <label htmlFor="occupation">
              <Typography variant="small" className="mb-2 block font-medium text-gray-900">
                Occupation
              </Typography>
            </label>
            <Select
              defaultValue={biodata?.occupation || ""}
              id="occupation"
              name="occupation"
              color="gray"
              size="lg"
              value={occupation}
              onChange={(value) => setOccupation(value)}

            >
              <Option value="" disabled>
                Pick one
              </Option>
              <Option value="Student">Student</Option>
              <Option value="Engineer">Engineer</Option>
              <Option value="Doctor">Doctor</Option>
              <Option value="Teacher">Teacher</Option>
              <Option value="Business Man">Business Man</Option>
              <Option value="Banker">Banker</Option>
              <Option value="Other">Other</Option>
            </Select>
          </div>

          {/* Race */}
          <div>
            <label htmlFor="race">
              <Typography variant="small" className="mb-2 block font-medium text-gray-900">
                Race
              </Typography>
            </label>
            <Select
              defaultValue={biodata?.race || ""}
              id="race"
              color="gray"
              size="lg"
              value={race}
              onChange={(value) => setRace(value)}
            >
              <Option value="" disabled>
                Pick one
              </Option>
              <Option value="Fair">Fair</Option>
              <Option value="Medium">Medium</Option>
              <Option value="Dark">Dark</Option>
            </Select>
          </div>

          {/* Fathers Name */}
          <div>
            <label htmlFor="fathersName">
              <Typography variant="small" className="mb-2 block font-medium text-gray-900">
                Father's Name
              </Typography>
            </label>
            <Input
              defaultValue={biodata?.fathersName || ""}
              id="fathersName"
              color="gray"
              size="lg"
              type="text"
              name="fathersName"
              placeholder="Father's Name"
              className="w-full"
            />
          </div>

          {/* Mothers Name */}
          <div>
            <label htmlFor="mothersName">
              <Typography variant="small" className="mb-2 block font-medium text-gray-900">
                Mother's Name
              </Typography>
            </label>
            <Input
              defaultValue={biodata?.mothersName || ""}
              id="mothersName"
              color="gray"
              size="lg"
              type="text"
              name="mothersName"
              placeholder="Mother's Name"
              className="w-full"
            />
          </div>

          {/* Permanent Division */}
          <div>
            <label htmlFor="permanentDivision">
              <Typography variant="small" className="mb-2 block font-medium text-gray-900">
                Permanent Division
              </Typography>
            </label>
            <Select
              defaultValue={biodata?.permanentDivision || ""}
              id="permanentDivision"
              name="permanentDivision"
              color="gray"
              size="lg"
              value={permanentDivision}
              onChange={(value) => setPermanentDivision(value)}
            >
              <Option value="" disabled>
                Pick one
              </Option>
              <Option value="Dhaka">Dhaka</Option>
              <Option value="Chattagra">Chattagra</Option>
              <Option value="Rangpur">Rangpur</Option>
              <Option value="Barisal">Barisal</Option>
              <Option value="Khulna">Khulna</Option>
              <Option value="Sylhet">Sylhet</Option>
            </Select>
          </div>

          {/* Present Division */}
          <div>
            <label htmlFor="presentDivision">
              <Typography variant="small" className="mb-2 block font-medium text-gray-900">
                Present Division
              </Typography>
            </label>
            <Select
              defaultValue={biodata?.presentDivision || ""}
              id="presentDivision"
              name="presentDivision"
              color="gray"
              size="lg"
              value={presentDivision}
              onChange={(value) => setPresentDivision(value)}
            >
              <Option value="" disabled>
                Pick one
              </Option>
              <Option value="Dhaka">Dhaka</Option>
              <Option value="Chattagra">Chattagra</Option>
              <Option value="Rangpur">Rangpur</Option>
              <Option value="Barisal">Barisal</Option>
              <Option value="Khulna">Khulna</Option>
              <Option value="Sylhet">Sylhet</Option>
            </Select>
          </div>

          {/* Expected Partner Age */}
          <div>
            <label htmlFor="expectedPartnerAge">
              <Typography variant="small" className="mb-2 block font-medium text-gray-900">
                Expected Partner Age
              </Typography>
            </label>
            <Input
              defaultValue={biodata?.expectedPartnerAge || ""}
              id="expectedPartnerAge"
              color="gray"
              size="lg"
              type="number"
              name="expectedPartnerAge"
              placeholder="Expected Partner Age"
              className="w-full"
            />
          </div>

          {/* Expected Partner Height */}
          <div>
            <label htmlFor="expectedPartnerHeight">
              <Typography variant="small" className="mb-2 block font-medium text-gray-900">
                Expected Partner Height
              </Typography>
            </label>
            <Input
              defaultValue={biodata?.expectedPartnerHeight || ""}
              id="expectedPartnerHeight"
              color="gray"
              size="lg"
              type="text"
              name="expectedPartnerHeight"
              placeholder="Height in cm"
              className="w-full"
            />
          </div>

          {/* Expected Partner Weight */}
          <div>
            <label htmlFor="expectedPartnerWeight">
              <Typography variant="small" className="mb-2 block font-medium text-gray-900">
                Expected Partner Weight
              </Typography>
            </label>
            <Input
              defaultValue={biodata?.expectedPartnerWeight || ""}
              id="expectedPartnerWeight"
              color="gray"
              size="lg"
              type="text"
              name="expectedPartnerWeight"
              placeholder="Weight in kg"
              className="w-full"
            />
          </div>



          {/* Mobile */}
          <div>
            <label htmlFor="mobile">
              <Typography variant="small" className="mb-2 block font-medium text-gray-900">
                Mobile Number
              </Typography>
            </label>
            <Input
              defaultValue={biodata?.mobile || ""}
              id="mobile"
              color="gray"
              size="lg"
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              className="w-full"
            />
          </div>

          <div className="col-span-2 flex justify-center ">
            {/* <Button color="blue" size="lg" type="submit">
              Save and Publish Now
            </Button> */}
            <Button color="blue" className="bg-gray-900" size="lg" type="submit">
              {biodata ? "Update & Save" : "Save and Publish Now"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Create_Edit_Biodata;