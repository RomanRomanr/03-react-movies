import axios from "axios";
import type { Movie } from "../types/movie";
 interface FethchMoviesParams {
  query: string;
  page?: number;
}
 interface FetchMoviesRes {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
const token = import.meta.env.VITE_TMDB_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3";
export const FetchMovies = async (
    params: FethchMoviesParams,
): Promise<Movie[]> => {
    const { query, page = 1 } = params;
    if (!query) {
        return [];
    }
    if (!token) {
        throw new Error("TMDB token is missing in .env");
        
    }
    try {
        const res = await axios.get<FetchMoviesRes>(`${BASE_URL}/search/movie`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    accept: 'application/json',
                },
                params: {
                    query,
                    page,
                },
            });
        return res.data.results;
    }
    catch (error) {
        console.error("Error fetching movies:", error);
        return [];
    }
};
