import { dashboardGetPieGraphDoc } from "../gql-docs/dashboartDocs";
import { graphqlQuery } from "../infra/apis/graphqlActions";
import { AxiosResponseData } from "../models/AxiosModel";
import { DashboardPieGraph } from "../models/DashboardModel";

export async function dashboardGetPieGraph() {
  const query = await graphqlQuery(dashboardGetPieGraphDoc(), {});

  if (query.data.errors) {
    return query.data;
  }

  const data = query.data.data.getDashboardPieGraph;

  return { data } as AxiosResponseData & {
    data: DashboardPieGraph;
  };
}
