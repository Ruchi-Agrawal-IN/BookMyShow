import { useEffect, useState } from "react";
import { GetAllMovies } from "../apiCalls/Movies";
import { Col, Row, message } from "antd";
import { useNavigate } from "react-router";

function Home() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  console.log({ movies });

  const getData = async () => {
    try {
      const response = await GetAllMovies();

      if (response.data.success) {
        message.success("Movies fetched");
        setMovies(response.data.movies);
      } else {
        message.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {/* SearchBox to be displayed here */}

      <h1 className="text-md uppercase mb-2">Currently Showing Movies</h1>

      <Row gutter={[20]} className="mt-2">
        {movies.map((movie) => (
          <Col key={movie._id} span={6}>
            <div
              className="card flex flex-col gap-3 cursor-pointer"
              onClick={() => {
                navigate(`/movie/${movie._id}`);
              }}
            >
              <img
                src={movie.poster}
                height={200}
                style={{ backgroundSize: "cover" }}
                alt="Image poster"
              />

              <div className="flex justify-center p-1">
                <h1 className="text-md uppercase">{movie.title}</h1>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Home;
