import React from "react";
import { RouteNode } from "../../../domain/models/RouteModel";
import { routeGetNodes } from "../../../domain/services/routeService";
import { message } from "antd";

function CommutesNodesPage() {
  const [loading, setLoading] = React.useState(true);
  const [nodes, setNodes] = React.useState<RouteNode[]>([]);

  React.useEffect(() => {
    if (loading) {
      (async () => {
        const response = await routeGetNodes({ size: 10000000, page: 0 });

        if (response.errors) {
          response.errors.forEach((error) => {
            message.error(error.message);
          });
        } else {
          console.log(response.data.content);
          setNodes(response.data.content);
        }

        setLoading(false);
      })();
    }
  }, []);

  return <div>CommitesNodesPage</div>;
}

export default CommutesNodesPage;
