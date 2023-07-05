import { useParams } from "react-router-dom";
import ProfilePage from "../ProfilePage";

function UsersProfilePage() {
  const { id } = useParams();

  return <ProfilePage id={id} />;
}

export default UsersProfilePage;
