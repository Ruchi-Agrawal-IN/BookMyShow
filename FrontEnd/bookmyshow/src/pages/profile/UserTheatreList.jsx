import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TheatreForm from "./TheatresForm";
// import {
//   DeleteTheatre,
//   GetAllTheatres,
//   GetAllTheatresByOwner,
// } from "../../apicalls/theatres";
import { GetTheatresByUserId } from "../../apiCalls/Theatres";
import { useDispatch, useSelector } from "react-redux";
import { message, Table, Button } from "antd";
import Shows from "./shows";

function UserTheatreList() {
  const { user } = useSelector((state) => state.users);
  const [showTheatreFormModal = false, setShowTheatreFormModal] =
    useState(false);
  const [selectedTheatre = null, setSelectedTheatre] = useState(null);
  const [formType = "add", setFormType] = useState("add");
  const [theatres, setTheatres] = useState([]);

  const [openShowsModal = false, setOpenShowsModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getTheatresListforUser = async () => {
    try {
      const response = await GetTheatresByUserId({
        userId: user._id,
      });
      if (response.data.success) {
        setTheatres(response.data.theatres);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  //   const handleDelete = async (id) => {
  //     try {
  //       dispatch(ShowLoading());
  //       const response = await DeleteTheatre({ theatreId: id });
  //       if (response.success) {
  //         message.success(response.message);
  //         getData();
  //       } else {
  //         message.error(response.message);
  //       }
  //       dispatch(HideLoading());
  //     } catch (error) {
  //       dispatch(HideLoading());
  //       message.error(error.message);
  //     }
  //   };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Status",
      dataIndex: "isActive",
      render: (text, record) => {
        if (text) {
          return "Approved";
        } else {
          return "Pending / Blocked";
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="flex gap-1 items-center">
            <i
              className="ri-delete-bin-line"
              onClick={() => {
                // handleDelete(record._id);
              }}
            ></i>
            <i
              className="ri-pencil-line"
              onClick={() => {
                setFormType("edit");
                setSelectedTheatre(record);
                setShowTheatreFormModal(true);
              }}
            ></i>

            {record.isActive && (
              <span
                className="underline"
                onClick={() => {
                  setSelectedTheatre(record);
                  setOpenShowsModal(true);
                }}
              >
                Shows
              </span>
            )}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getTheatresListforUser();
  }, []);

  return (
    <div>
      <div className="flex justify-end mb-1">
        <Button
          variant="outlined"
          onClick={() => {
            setFormType("add");
            setShowTheatreFormModal(true);
          }}
        >
          Add Theatre
        </Button>
      </div>

      <Table columns={columns} dataSource={theatres} />

      {showTheatreFormModal && (
        <TheatreForm
          showTheatreFormModal={showTheatreFormModal}
          setShowTheatreFormModal={setShowTheatreFormModal}
          formType={formType}
          setFormType={setFormType}
          selectedTheatre={selectedTheatre}
          setSelectedTheatre={setSelectedTheatre}
          getData={getTheatresListforUser}
        />
      )}

      {openShowsModal && (
        <Shows
          openShowsModal={openShowsModal}
          setOpenShowsModal={setOpenShowsModal}
          theatre={selectedTheatre}
        />
      )}
    </div>
  );
}

export default UserTheatreList;
