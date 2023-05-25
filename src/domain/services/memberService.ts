import {
  memberGetAllDoc,
  memberGetByPhoneDoc,
  memberGetByUsernameDoc,
  memberRolesGetDoc,
} from "../gql-docs/memberDocs";
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
  const query = graphqlQuery(memberRolesGetDoc(), "Get Role List", {
    variables: { page: 0, size: 100 },
    fetchPolicy: "network-only",
  });

  const processedData = query.data?.getRoles.content.map((role: any) => ({
    value: role.name,
  }));

  return { ...query, data: processedData };
}

export function memberGet(params: Record<string, any>) {
  const { username, phone } = params;

  let query, processedData;
  if (username) {
    query = graphqlQuery(
      memberGetByUsernameDoc(),
      "User get profile by username",
      {
        variables: { username },
        fetchPolicy: "network-only",
      }
    );
    processedData = query.data?.getMemberByUsername;
  } else if (phone) {
    query = graphqlQuery(memberGetByPhoneDoc(), "User get profile by phone", {
      variables: { phone },
      fetchPolicy: "network-only",
    });
    processedData = query.data?.getMemberByPhone;
  }

  return { ...query, data: processedData };
}
