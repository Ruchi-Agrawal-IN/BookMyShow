import { Tabs } from "antd";
import PageTitle from "../../components/PageTitle";
import UserTheatreList from "./UserTheatreList";
import Bookings from "./Bookings";

function Profile() {
  return (
    <div>
      <PageTitle title="Profile" />

      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Bookings" key="1">
          <Bookings />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Apply for Theater" key="2">
          <UserTheatreList />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default Profile;
