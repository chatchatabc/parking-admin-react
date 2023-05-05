import { useParams } from "react-router-dom";
import NotFoundPage from "../NotFoundPage";
import ProfilePage from "../profile/ProfilePage";

function UsersProfilePage() {
  const { profile } = useParams();

  const identifiers = profile?.split("-");

  if (!identifiers || (identifiers[0] !== "u" && identifiers[0] !== "p")) {
    return <NotFoundPage />;
  }

  const username = identifiers[0] === "u" ? identifiers[1] : undefined;
  const phone = identifiers[0] === "p" ? identifiers[1] : undefined;

  return <ProfilePage username={username} phone={phone} />;
}

export default UsersProfilePage;
