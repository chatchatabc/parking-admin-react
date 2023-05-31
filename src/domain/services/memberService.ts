import {
  memberGetAllDoc,
  memberGetByPhoneDoc,
  memberGetByUsernameDoc,
  memberRolesGetDoc,
} from "../gql-docs/memberDocs";
import { apolloClient } from "../infra/apollo-client/apolloActions";
import { axiosPost } from "../infra/axios/axiosActions";

export async function memberGetAll({
  page = 10,
  size = 10,
  keyword = undefined,
}: Record<string, any>) {
  const query = await apolloClient.query({
    query: memberGetAllDoc(),
    variables: { page, size, keyword },
    fetchPolicy: "network-only",
  });

  return query.data.getMembers;
}

export async function memberCreate(values: Record<string, any>) {
  const response = await axiosPost("/member/create", values);

  return response.data;
}

export async function memberRolesGet() {
  const query = await apolloClient.query({
    query: memberRolesGetDoc(),
    variables: { page: 0, size: 100 },
    fetchPolicy: "network-only",
  });

  return query.data.getRoles.content.map((role: any) => ({
    value: role.name,
  }));
}

export async function memberGet(params: Record<string, any>) {
  const { username, phone } = params;

  let query, processedData;
  if (username) {
    query = await apolloClient.query({
      query: memberGetByUsernameDoc(),
      variables: { username },
      fetchPolicy: "network-only",
    });
    processedData = query.data.getMemberByUsername;
  } else if (phone) {
    query = await apolloClient.query({
      query: memberGetByPhoneDoc(),
      variables: { phone },
      fetchPolicy: "network-only",
    });
    processedData = query.data.getMemberByPhone;
  }

  return processedData;
}
