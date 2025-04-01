import React, { useState } from "react";
import { Card, Typography, Button, Input } from "@material-tailwind/react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Fetching users
  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("Access-token")}`,
        },
      });
      return res.data;
    },
  });

  // ✅ Fetching premium requests
  const { data: premiumRequests = [], refetch: refetchPremiumRequests } = useQuery({
    queryKey: ["premium-requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/premium-requests");
      return res.data;
    },
  });

  // ✅ Fetching user premium status from the biodata collection
  const { data: biodataUsers = [] } = useQuery({
    queryKey: ["biodata-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/get-create-edit-biodata");
      return res.data;
    },
  });

  // ✅ Filtering users based on search query
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ✅ Check if a user has requested premium
  const isUserRequestedPremium = (email) => {
    return premiumRequests.some((request) => request.email === email && request.status === "Pending");
  };

  // ✅ Check if a user is already premium
  const isUserPremium = (email) => {
    const userBiodata = biodataUsers.find((user) => user.email === email);
    return userBiodata?.isPremium || false;
  };

  // ✅ Handle Make Admin
  const handleMakeAdmin = async (user) => {
    try {
      const res = await axiosSecure.patch(`/users/admin/${user._id}`, {}, {
        headers: { authorization: `Bearer ${localStorage.getItem("Access-token")}` }
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire("Success!", `${user.name} is now an admin!`, "success");
        refetch();
      } else {
        Swal.fire("Error!", "User role not updated. Try again!", "error");
      }
    } catch (error) {
      Swal.fire("Error!", error.response?.data?.message || "Could not update admin role.", "error");
    }
  };

  // ✅ Handle Make Premium
  const handleMakePremium = async (user) => {
    try {
      await axiosSecure.patch(`/update-biodata-premium/${user.email}`);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "User has been marked as premium successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
      refetchPremiumRequests();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while updating the user to premium!",
      });
    }
  };

  // ✅ Show loading while data is fetching
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-6">
        <Button className="rounded-full" loading={true}>
          Loading
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full bg-white">
      <div className="p-6">
        <Typography className="font-bold text-4xl mb-4 gloock-regular">
          User Management System of BlissBonds ({filteredUsers.length})
        </Typography>
        <Typography className="text-lg w-80 font-normal text-gray-600 md:w-full gilda-display-regular">
          Overview of the key admin involved in our project.
        </Typography>
      </div>

      {/* Search Bar */}
      <div className=" py-6 w-3/6">
        <Input
          label="Search by Name"
          icon={<MagnifyingGlassIcon className="h-5 w-5" />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Card className="h-full w-full overflow-scroll border border-gray-300 px-6">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th className="border-b border-gray-300 pb-4 pt-10">
                <Typography variant="small" color="blue-gray" className="font-bold leading-none">
                  Name
                </Typography>
              </th>
              <th className="border-b border-gray-300 pb-4 pt-10">
                <Typography variant="small" color="blue-gray" className="font-bold leading-none">
                  Email
                </Typography>
              </th>
              <th className="border-b border-gray-300 pb-4 pt-10">
                <Typography variant="small" color="blue-gray" className="font-bold leading-none">
                  Make Admin
                </Typography>
              </th>
              <th className="border-b border-gray-300 pb-4 pt-10">
                <Typography variant="small" color="blue-gray" className="font-bold leading-none">
                  Accept Premium Request
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => {
              const isLast = index === filteredUsers.length - 1;
              const classes = isLast ? "py-4" : "py-4 border-b border-gray-300";

              return (
                <tr key={user.email} className="hover:bg-gray-50">
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-bold">
                      {user.name}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" className="font-normal text-gray-600">
                      {user.email}
                    </Typography>
                  </td>
                  <td className={classes}>
                    {user.role === "admin" ? (
                      <Button size="sm" variant="gradient" color="green" className="text-xs">
                        Admin
                      </Button>
                    ) : (
                      <Button onClick={() => handleMakeAdmin(user)} size="sm" variant="gradient" color="orange" className="text-xs">
                        Make Admin
                      </Button>
                    )}
                  </td>
                  <td className={classes}>
                    {isUserPremium(user.email) ? (
                      <Button size="sm" variant="gradient" color="green" className="text-xs" disabled>
                        Already Premium
                      </Button>
                    ) : isUserRequestedPremium(user.email) ? (
                      <Button onClick={() => handleMakePremium(user)} size="sm" variant="gradient" color="blue" className="text-xs">
                        Make Premium
                      </Button>
                    ) : (
                      <Button size="sm" variant="gradient" color="gray" className="text-xs" disabled>
                        No Request
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default ManageUsers;
