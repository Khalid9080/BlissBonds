import axios from 'axios';
import React from 'react';

import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useCard = () => {
   const axiosSecure = useAxiosSecure();
   const{data:card=[]}=useQuery({
         queryKey:['card'],
         queryFn:async ()=>{
            const res=axiosSecure.get('/cards')
            return res.data;
         }
   })
   return [card];
};

export default useCard;
