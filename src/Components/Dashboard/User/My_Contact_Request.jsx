import { useEffect, useState } from "react";
import { Card, Typography, Chip, Button } from "@material-tailwind/react";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const axiosPublic = useAxiosPublic();

const My_Contact_Request = () => {
  const [contactRequests, setContactRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContactRequests = async () => {
      try {
        setLoading(true);
        const res = await axiosPublic.get("/get-my-contact-requests");

        // Sort by Biodata ID in Ascending Order
        const sortedRequests = res.data.sort((a, b) => a.biodataId - b.biodataId);
        setContactRequests(sortedRequests);
      } catch (error) {
        console.error("Error fetching contact requests:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContactRequests();
  }, []);

  return (
    <section className="w-full bg-white p-6">
      <Typography variant="lead"  className="font-bold gloock-regular text-4xl mt-10">
        My Contact Requests
      </Typography>
      <Typography className="mb-4 font-normal text-gray-700 gilda-display-regular text-lg mt-5">
        Below is a list of your contact requests along with their status.
      </Typography>

      <Card className="h-full w-full overflow-scroll border border-gray-300 px-6 mt-5">
        {loading ? (
          <div className="flex justify-center items-center py-6">
            <Button variant="text" loading={true}>
              Loading
            </Button>
          </div>
        ) : (
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                <th className="border-b border-gray-300 pb-4 pt-10">
                  <Typography variant="small" color="blue-gray" className="font-bold">
                    Biodata ID
                  </Typography>
                </th>
                <th className="border-b border-gray-300 pb-4 pt-10">
                  <Typography variant="small" color="blue-gray" className="font-bold">
                    Email
                  </Typography>
                </th>
                <th className="border-b border-gray-300 pb-4 pt-10">
                  <Typography variant="small" color="blue-gray" className="font-bold">
                    Phone Number
                  </Typography>
                </th>
                <th className="border-b border-gray-300 pb-4 pt-10">
                  <Typography variant="small" color="blue-gray" className="font-bold">
                    Status
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {contactRequests.map(({ _id, biodataId, status }) => {
                return (
                  <tr key={_id} className="hover:bg-gray-50">
                    <td className="py-4 border-b border-gray-300">
                      <Typography variant="small" color="blue-gray" className="font-bold">
                        {biodataId}
                      </Typography>
                    </td>
                    <td className="py-4 border-b border-gray-300">
                      {status === "Approved" ? (
                        <FetchBiodataInfo biodataId={biodataId} field="email" />
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="py-4 border-b border-gray-300">
                      {status === "Approved" ? (
                        <FetchBiodataInfo biodataId={biodataId} field="mobile" />
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="py-4 border-b border-gray-300">
                      <Chip
                        variant="ghost"
                        color={status === "Approved" ? "green" : "red"}
                        size="sm"
                        value={status}
                        icon={
                          <span
                            className={`mx-auto mt-1 block h-2 w-2 rounded-full ${
                              status === "Approved" ? "bg-green-900" : "bg-red-900"
                            }`}
                          />
                        }
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </Card>
    </section>
  );
};

const FetchBiodataInfo = ({ biodataId, field }) => {
  const [info, setInfo] = useState("Loading...");

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await axiosPublic.get(`/biodata-details/${biodataId}`);
        setInfo(res.data[field] || "N/A");
      } catch (error) {
        console.error("Error fetching biodata info:", error);
        setInfo("N/A");
      }
    };
    fetchInfo();
  }, [biodataId, field]);

  return <span>{info}</span>;
};

export default My_Contact_Request;
