// components/movie-component.tsx
import React, { useEffect } from "react";
import { useFilterStore } from "../../store/filter-store";
import { Movie } from "../../data/movie/movie";
import { useMovieStore } from "../../store/movie-store";
import { MovieRequest } from "../../data/movie/movie-request";

interface MovieComponentProps {}

const MovieComponent: React.FC<MovieComponentProps> = () => {
    const { movies, fetchMovies, loading } = useMovieStore((state) => ({
        movies: state.movies,
        fetchMovies: state.fetchMovies,
        loading: state.loading,
    }));
    
    const filter = useFilterStore((state) => state.filter);

    const applyFilters = async () => {
        // Construct the MovieRequest object based on the current filter
        const request: MovieRequest = {
            plot: filter.plot || "",
            title: filter.title || "",
            cast: filter.cast ? [filter.cast] : [],
            genres: [],
            languages: [],
            countries: [],
            rated: "",
            releasedAfter: filter.releasedAfter || new Date("1900-01-01"),
            releasedBefore: filter.releasedBefore || new Date(),
            next: null as any, 
            pageSize: 10,
        };

        await fetchMovies(request);
    };

    useEffect(() => {
        applyFilters();
    }, [filter]);

    return (
        <div>
            <h1>Movies</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {movies.length > 0 ? (
                        movies.map((movie) => (
                            <li>{movie.title}</li>
                        ))
                    ) : (
                        <li>No movies available</li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default MovieComponent;
