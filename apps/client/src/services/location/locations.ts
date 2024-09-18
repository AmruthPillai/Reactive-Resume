import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { LocationDto } from "@/../libs/dto/src/location/index";
import { LOCATIONS_KEY } from "@/client/constants/query-keys";
import { axios } from "@/client/libs/axios";

export const fetchLocations: () => Promise<LocationDto[]> = async () =>{
  const response = await axios.get<LocationDto[], AxiosResponse<LocationDto[]>>(
    "/storage/locations",
  );

  return response.data;
};

export const useLocations = () => {
  const {
    error,
    isPending: loading,
    data: locations,
  } = useQuery({
    queryKey: LOCATIONS_KEY,
    queryFn: fetchLocations,
  });

  return { locations, loading, error };
};
