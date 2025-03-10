import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Button, Chip } from "@material-tailwind/react";

const axiosPublic = useAxiosPublic();

const Approve_Contact_Request = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRequests = async () => {
        try {
            setLoading(true);
            const res = await axiosPublic.get("/get-my-contact-requests");
            const sortedRequests = res.data.sort((a, b) => a.biodataId - b.biodataId); // Ascending Order
            setRequests(sortedRequests);
        } catch (error) {
            console.error("Error fetching requests:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleApprove = async (id) => {
        try {
            await axiosPublic.patch(`/approve-payment/${id}`);
            setRequests((prevRequests) =>
                prevRequests.map((req) =>
                    req._id === id ? { ...req, status: "Approved" } : req
                )
            );
        } catch (error) {
            console.error("Approval failed:", error);
        }
    };

    const totalRevenue = requests.reduce((sum, req) => sum + parseFloat(req.amount || 0), 0);

    return (
        <div>
            {loading ? (
                <div className="flex justify-center items-center">
                    <Button className="rounded-full" loading={true}>
                        Loading
                    </Button>
                </div>
            ) : (
                <div className="flex justify-between items-center flex-col space-y-5">
                    <h1 className=" font-bold gloock-regular text-5xl ">Approve Contact Requests</h1>
                    <p className="gilda-display-regular mt-3 text-lg">Approve BlissBonds users contact request from this page</p>
                    <table className="w-full min-w-max table-auto text-left border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100 border-b">
                                <th className="border p-2">Biodata ID</th>
                                <th className="border p-2">Email</th>
                                <th className="border p-2">Name</th>
                                <th className="border p-2">Amount</th>
                                <th className="border p-2">Status</th>
                                <th className="border p-2">Approve</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((request) => (
                                <tr key={request._id} className="border-b">
                                    <td className="border p-2">{request.biodataId}</td>
                                    <td className="border p-2">{request.email}</td>
                                    <td className="border p-2">{request.name}</td>
                                    <td className="border p-2">${request.amount}</td>
                                    
                                    {/* ✅ Status Chip */}
                                    <td className="border p-2">
                                        {request.status === "Pending" ? (
                                            <Chip
                                                variant="ghost"
                                                color="red"
                                                size="sm"
                                                value="Pending"
                                                icon={<span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-red-600 content-['']" />}
                                            />
                                        ) : (
                                            <Chip
                                                variant="ghost"
                                                color="green"
                                                size="sm"
                                                value="Approved"
                                                icon={<span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-green-900 content-['']" />}
                                            />
                                        )}
                                    </td>

                                    <td className="border p-2">
                                        {request.status === "Pending" ? (
                                            <button
                                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                                onClick={() => handleApprove(request._id)}
                                            >
                                                Approve
                                            </button>
                                        ) : (
                                            <span className="text-green-500">✔</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            <tr className="bg-gray-200 font-bold">
                                <td className="border p-2" colSpan="3">Total Revenue</td>
                                <td className="border p-2">${totalRevenue.toFixed(2)}</td>
                                <td className="border p-2" colSpan="2"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Approve_Contact_Request;
