import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import moment from "moment";
import { GetAllTheatresForMovie } from "../../apiCalls/Theatres";
import { GetMovieById } from "../../apiCalls/Movies";
import { message } from "antd";

function TheatresForMovie() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [theatres, setTheatres] = useState([]);
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();
  const getData = useCallback(async () => {
    try {
      const theatreResponse = await GetAllTheatresForMovie(id);
      if (theatreResponse.data.success) {
        message.success("Theatres showslist for movie details fetched!");
        setTheatres(theatreResponse.data.data);
        // console.log({ theatresList: theatreResponse.data.data });
      } else {
        message.error("Theatres showslist error ", theatreResponse.message);
      }

      const movieResponse = await GetMovieById(id);
      if (movieResponse.data.success) {
        message.success("Movie details fetched!");
        setMovie(movieResponse.data.movie);
      } else {
        message.error("movieResponse  found error", movieResponse.data.message);
      }
    } catch (error) {
      message.error("Theatre for movies data fetching error: ", error.message);
    }
  }, [id]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div>
      <div className="flex justify-between items-center  m-3 pl-2 pr-2  w-screen">
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

      {/* movie theatres */}
      <div className="mt-1">
        <h1 className="text-xl uppercase">Theatres</h1>
      </div>

      <div className="mt-1 flex flex-col gap-1">
        {theatres.map((theatre) => (
          <div key={theatre._id} className="card p-2">
            <h1 className="text-md uppercase">{theatre.name}</h1>
            <h1 className="text-sm">Address : {theatre.address}</h1>

            <div className="divider"></div>

            <div className="flex gap-2">
              {console.log({ theatre_shows: theatre })}
              {theatre.shows
                .sort(
                  (a, b) =>
                    moment(a._doc.time, "HH:mm") - moment(b._doc.time, "HH:mm")
                )
                .map((show) => (
                  <div
                    key={show._doc._id}
                    style={{
                      backgroundColor: isHovering ? "#DF1827" : "white",
                      color: isHovering ? "white" : "#DF1827",
                    }}
                    // onMouseEnter={handleMouseEnter}
                    // onMouseLeave={handleMouseLeave}
                    className="card p-1 cursor-pointer border-primary"
                    onClick={() => {
                      navigate(`/book-show/${show._doc._id}`);
                    }}
                    // onMouseEnter={() => {
                    //   console.log("Show:", show._doc);
                    //   console.log("Show date:", show._doc.date);
                    //   console.log("Show time:", show._doc.time);
                    //   setIsHovering(true);
                    // }}
                    // onMouseLeave={() => {
                    //   setIsHovering(false);
                    // }}
                  >
                    <h1 className="text-sm">
                      {moment(show._doc.time, "HH:mm").format("hh:mm A")}
                    </h1>
                    <h5>{moment(show._doc.date).format("ddd / DD:MM:YYYY")}</h5>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TheatresForMovie;
