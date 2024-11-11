import { useSearchParams } from "react-router-dom";

export function useUrlPositions()  {
    const [searchParams, setSearchParams] = useSearchParams();

    const long = searchParams.get('lng');
    const lat = searchParams.get('lat');

    return [lat, long]

}

