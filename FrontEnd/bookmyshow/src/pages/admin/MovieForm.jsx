import { Button, Col, Form, message, Modal, Row } from "antd";
//import { useDispatch } from "react-redux";
// import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import moment from "moment";
import { AddMovie, UpdateMovie } from "../../apiCalls/Movies";
import PropTypes from "prop-types";
function MovieForm({
  showMovieFormModal,
  setShowMovieFormModal,
  selectedMovie,
  setSelectedMovie,
  getData,
  formType,
}) {
  if (selectedMovie) {
    selectedMovie.releaseDate = moment(selectedMovie.releaseDate).format(
      "YYYY-MM-DD"
    );
  }

  //const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      let response = null;

      if (formType === "add") {
        response = await AddMovie(values);
      } else {
        response = await UpdateMovie({
          ...values,
          movieId: selectedMovie._id,
        });
      }
      console.log(`${formType} movie api response : ${response.data}`);
      if (response.data.success) {
        if (formType === "add") {
          message.success("New Movie Added!");
        } else {
          message.success("Movie edited successfully!");
        }
        setShowMovieFormModal(false);
        getData();
      } else {
        message.error(`Something went wrong : ${response.message}`);
      }
    } catch (error) {
      console.log(error);
      message.error(`Catched Error : ${error.message}`);
    }
  };
  // Add prop type validation
  MovieForm.propTypes = {
    showMovieFormModal: PropTypes.bool.isRequired,
    setShowMovieFormModal: PropTypes.func.isRequired,
    selectedMovie: PropTypes.object,
    setSelectedMovie: PropTypes.func.isRequired,
    getData: PropTypes.func.isRequired,
    formType: PropTypes.string.isRequired,
  };
  return (
    <Modal
      title={formType === "add" ? "ADD MOVIE" : "EDIT MOVIE"}
      open={showMovieFormModal}
      onCancel={() => {
        setShowMovieFormModal(false);
        setSelectedMovie(null);
      }}
      footer={null}
      width={800}
    >
      <Form layout="vertical" onFinish={onFinish} initialValues={selectedMovie}>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Movie Name" name="title">
              <input type="text" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Movie Description" name="description">
              <textarea type="text" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Movie Duration (Min)" name="duration">
              <input type="number" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Language" name="language">
              <select name="" id="">
                <option value="">Select Language</option>
                <option value="Telugu">Telugu</option>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Tamil">Tamil</option>
              </select>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Movie Release Date" name="releaseDate">
              <input type="date" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Genre" name="genre">
              <select name="" id="">
                <option value="">Select Genre</option>
                <option value="Action">Action</option>
                <option value="Comedy">Comedy</option>
                <option value="Drama">Drama</option>
                <option value="Romance">Romance</option>
              </select>
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item label="Poster URL" name="poster">
              <input type="text" />
            </Form.Item>
          </Col>
        </Row>

        <div className="flex justify-end gap-1">
          <Button
            variant="outlined"
            type="button"
            onClick={() => {
              setShowMovieFormModal(false);
              setSelectedMovie(null);
            }}
          >
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default MovieForm;
