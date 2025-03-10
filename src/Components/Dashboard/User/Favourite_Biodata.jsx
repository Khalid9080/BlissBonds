import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { Button } from "@material-tailwind/react";

const Favourite_Biodata = () => {
    const [favouriteBiodatas, setFavouriteBiodatas] = useState([]);
    const axiosPublic = useAxiosPublic();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFavourites = async () => {
            try {
                const response = await axiosPublic.get('/favourite-biodatas');
                console.log("API Response:", response.data); 

                // Ensure data is an array and sort by Biodata ID in ascending order
                const sortedData = Array.isArray(response.data) 
                    ? response.data.sort((a, b) => a.biodataId - b.biodataId) 
                    : [];

                setFavouriteBiodatas(sortedData);
            } catch (error) {
                console.error("Error fetching favourite biodatas:", error);
                setFavouriteBiodatas([]); 
            } finally {
                setLoading(false);
            }
        };

        fetchFavourites();
    }, []);

    const handleRemoveFavourite = async (biodataId) => {
        try {
            const response = await axiosPublic.delete(`/remove-favourite/${biodataId}`);
            if (response.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Removed!",
                    text: "Biodata has been removed from favourites.",
                });

                // Remove the deleted item and re-sort the remaining items
                const updatedFavourites = favouriteBiodatas
                    .filter(b => b.biodataId !== biodataId)
                    .sort((a, b) => a.biodataId - b.biodataId); // Keep it sorted

                setFavouriteBiodatas(updatedFavourites);
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Failed to remove from favourites!",
            });
        }
    };

    return loading ? (
        <div className="flex justify-center items-center py-6">
            <Button className="rounded-full" loading={true}>
                Loading
            </Button>
        </div>
    ) : (
        <div className="w-full">
            <h3 className="font-semibold text-black text-5xl gloock-regular mb-3">Favourite Biodatas</h3>
            <p className="text-slate-500 gilda-display-regular">Review your selected profiles.</p>

            <div className="relative flex flex-col w-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg mt-10">
                <table className="w-full text-left table-auto min-w-max">
                    <thead>
                        <tr className="border-b border-slate-300 bg-slate-50">
                            <th className="p-4 text-base font-bold text-slate-500">Biodata ID</th>
                            <th className="p-4 text-base font-bold text-slate-500">Name</th>
                            <th className="p-4 text-base font-bold text-slate-500">Permanent Address</th>
                            <th className="p-4 text-base font-bold text-slate-500">Occupation</th>
                            <th className="p-4 text-base font-bold text-slate-500">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {favouriteBiodatas.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="p-4 text-center text-gray-500">
                                    No favourites added yet.
                                </td>
                            </tr>
                        ) : (
                            favouriteBiodatas.map((biodata) => (
                                <tr key={biodata.biodataId} className="hover:bg-slate-50">
                                    <td className="p-4">{biodata.biodataId}</td>
                                    <td className="p-4">{biodata.name}</td>
                                    <td className="p-4">{biodata.permanentDivision}</td>
                                    <td className="p-4">{biodata.occupation}</td>
                                    <td className="p-4">
                                        <button
                                            onClick={() => handleRemoveFavourite(biodata.biodataId)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            ❌ Remove
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Favourite_Biodata;
