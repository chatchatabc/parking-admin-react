import { memberGetAllDoc, memberRolesGetDoc } from "../gql-docs/memberDocs";
import { graphqlQuery } from "../infra/apollo-client/apolloActions";
import { axiosPost } from "../infra/axios/axiosService";

export function memberGetAll(
  page: number,
  size: number,
  keyword: string | undefined
) {
  const query = graphqlQuery(memberGetAllDoc(), "Member Get List", {
    variables: { page, size, keyword },
    fetchPolicy: "network-only",
  });

  const processedData = query.data?.getMembers;

  return { ...query, data: processedData };
}

export async function memberCreate(values: Record<string, any>) {
  const response = await axiosPost("/member/create", values);

  return response.data;
}

export function memberRolesGet() {
  const query = graphqlQuery(memberRolesGetDoc(), "Member Get List", {
    variables: { page: 0, size: 100 },
    fetchPolicy: "network-only",
  });

  const processedData = query.data?.getRoles;

  return { ...query, data: processedData };
}
