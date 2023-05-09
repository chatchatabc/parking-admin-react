import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { authTokenRemove } from "../../domain/services/authService";

function NoAccessPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">403</h1>
      <p className="text-2xl font-bold">Access denied.</p>
      <p className="text-lg my-4">Your token has now expired.</p>
      <Button
        onClick={() => {
          authTokenRemove();
          navigate("/login");
        }}
        className="bg-primary text-white px-4 py-1"
      >
        Login again
      </Button>
    </div>
  );
}

export default NoAccessPage;
