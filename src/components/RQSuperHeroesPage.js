import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

//Fetcher function
const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const RQSuperHeroesPage = () => {
  const onSuccess = () => {
    console.log("Perform side effects after data fetching ");
  };

  const onError = () => {
    console.log("Perform side effects on error while data fetching ");
  };

  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    "super-heroes",
    fetchSuperHeroes,
    {
      //   cacheTime: 5000, // To cache the data for 5 seconds, default is 5 min
      //   staleTime: 10000, // Query will remain fresh for 10 sec instead of getting stale flag, when it is stale it will refetch new data, default is zero
      //   refetchOnMount: true, // Default is  true, the query will refetch the data if it is stale
      //   refetchOnWindowFocus: true, // Anytime the tab regains focus after losing it. It will refetch the data from server.
      //   refetchInterval: 2000, // Default is false, but here it will refetch the query at every 2 seconds.
      //   refetchIntervalInBackground: true, //refetch data in background
      //   enabled: false,
      onSuccess: onSuccess,
      onError: onError,
    }
  );

  console.log({ isLoading, isFetching });
  if (isLoading || isFetching) {
    return <h2>...Loading</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>RQ Super Heroes Page</h2>
      <button onClick={refetch}>Fetch Heroes</button>
      {data?.data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })}
    </>
  );
};

export default RQSuperHeroesPage;
