import { Table, message } from "antd";
import { useEffect, useState } from "react";
import { GetAllTheatres, UpdateTheatre } from "../../apiCalls/Theatres";
function AdminTheatresList() {
  const [theatres, setTheatres] = useState([]);
  const getTheatresListForAdmin = async () => {
    try {
      const response = await GetAllTheatres();
      if (response.data.success) {
        message.success("Theatres fetched!");
        setTheatres(response.data.theatres);
      } else {
        message.error(`Something went wrong: ${response.data.message}`);
      }
    } catch (error) {
      message.error(`getTheatresListForAdmin caught error: ${error.message}`);
    }
  };
  // This will take a theatre object as argument,
  // Swap the isActive field, and simply call UpdateTheatre
  const handleStatusChange = async (theatre) => {
    try {
      const response = await UpdateTheatre({
        theatreId: theatre._id,
        ...theatre,
        isActive: !theatre.isActive,
      });

      if (response.data.success) {
        if (theatre.isActive) {
          message.success("Theatre blocked successfully!");
        } else {
          message.success("Theatre approved successfully!");
        }
        getTheatresListForAdmin();
      } else {
        message.error("Something went wrong");
        console.log(response.data.message);
      }
    } catch (error) {
      message.error("Something went wrong");
      console.log(MediaError);
    }
  };
  useEffect(() => {
    getTheatresListForAdmin();
  }, []);
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
      title: "Owner",
      dataIndex: "owner",
      render: (text, record) => {
        return record.owner.name;
      },
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
          <div className="flex gap-1 m-3 pl-2 pr-2  w-screen">
            {record.isActive && (
              <span
                className="underline"
                onClick={() => handleStatusChange(record)}
              >
                Block
              </span>
            )}
            {!record.isActive && (
              <span
                className="underline"
                onClick={() => handleStatusChange(record)}
              >
                Approve
              </span>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={theatres} />
    </div>
  );
}
export default AdminTheatresList;
