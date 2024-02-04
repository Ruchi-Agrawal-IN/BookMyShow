import { Form, message, Modal, Button } from "antd";
import { useSelector } from "react-redux";
import { AddTheatre, UpdateTheatre } from "../../apiCalls/Theatres";
import PropTypes from "prop-types";
TheatreForm.propTypes = {
  showTheatreFormModal: PropTypes.bool.isRequired,
  setShowTheatreFormModal: PropTypes.func.isRequired,
  formType: PropTypes.oneOf(["add", "edit"]).isRequired,
  setFormType: PropTypes.func.isRequired,
  selectedTheatre: PropTypes.object, // You can replace this with more specific shape if needed
  setSelectedTheatre: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
};

function TheatreForm({
  showTheatreFormModal,
  setShowTheatreFormModal,
  formType,
  //   setFormType,
  selectedTheatre,
  setSelectedTheatre,
  getData,
}) {
  const { user } = useSelector((state) => state.users);
  //const dispatch = useDispatch();
  const onFinish = async (values) => {
    values.owner = user._id;
    try {
      let response = null;
      if (formType === "add") {
        response = await AddTheatre(values);
      } else {
        values.theatreId = selectedTheatre._id;
        response = await UpdateTheatre(values);
      }

      if (response.data.success) {
        message.success(response.data.message);
        setShowTheatreFormModal(false);
        setSelectedTheatre(null);
        getData();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <Modal
      title={formType === "add" ? "Add Theatre" : "Edit Theatre"}
      open={showTheatreFormModal}
      onCancel={() => {
        setShowTheatreFormModal(false);
        setSelectedTheatre(null);
      }}
      footer={null}
    >
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={selectedTheatre}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input theatre name!" }]}
        >
          <input type="text" />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please input theatre address!" }]}
        >
          <textarea type="text" />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[
            { required: true, message: "Please input theatre phone number!" },
          ]}
        >
          <input type="text" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input theatre email!" }]}
        >
          <input type="text" />
        </Form.Item>
        <div className="flex justify-end gap-1">
          <Button
            variant="outlined"
            htmlType="button"
            onClick={() => {
              setShowTheatreFormModal(false);
              setSelectedTheatre(null);
            }}
          >
            Cancel
          </Button>
          <Button htmlType="submit">Save</Button>
        </div>
      </Form>
    </Modal>
  );
}
// TheatreForm.prototype = {
//   showTheatreFormModal: Boolean,
//   setShowTheatreFormModal: Boolean,
//   formType: "add" | "edit",
//   setFormType: "add" | "edit",
//   selectedTheatre: TheaterModel,
//   setSelectedTheatre: TheaterModel,
//   getData?: []Theatre,
// };

export default TheatreForm;
