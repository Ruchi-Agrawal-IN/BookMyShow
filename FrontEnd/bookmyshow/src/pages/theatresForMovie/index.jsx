import { useEffect, useState } from "react";
import { useParams } from "react-router";
import moment from "moment";
import { GetAllTheatresForMovie } from "../../apiCalls/Theatres";
function TheatresForMovie() {
  const params = useParams();

  const [movie, setMovie] = useState({});
  useEffect(() => {
    getTheatersData();
  }, []);

  const getTheatersData = async () => {
    console.log({ params });
    console.log(params.id);
    // const movieResponse = await GetMovieById(params.id);
    const allTheatreForMovie = await GetAllTheatresForMovie({
      movieId: params.id,
    });
    // console.log(`movieResponse: ${movieResponse}`);
    console.log(`allTheatreForMovie: ${allTheatreForMovie}`);
    if (allTheatreForMovie.data.success) {
      setMovie();
    }
  };
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-2xl uppercase">
            {movie.title} ({movie.language})
          </h1>
          <h1 className="text-md">Duration : {movie.duration} mins</h1>
          <h1 className="text-md">
            Release Date : {moment(movie.releaseDate).format("MMM Do yyyy")}
          </h1>
          <h1 className="text-md">Genre : {movie.genre}</h1>
        </div>

        {/* <div className="mr-3">
          <h1 className="text-md ">Select Date</h1>
          <input
            type="date"
            min={moment().format("YYYY-MM-DD")}
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              navigate(`/movie/${params.id}?date=${e.target.value}`);
            }}
          />
        </div> */}
      </div>
    </div>
  );
}

export default TheatresForMovie;
