import { userGetByPhoneDoc, userGetByUsernameDoc } from "../gql-docs/userDocs";
import { graphqlQuery } from "../infra/apollo-client/apolloActions";
import { axiosPut } from "../infra/axios/axiosActions";

export function userGetProfile(params: Record<string, string | undefined>) {
  const { username, phone } = params;

  let query, processedData;
  if (username) {
    query = graphqlQuery(
      userGetByUsernameDoc(),
      "User get profile by username",
      {
        variables: { username },
        fetchPolicy: "network-only",
      }
    );
    processedData = query.data?.getUserByUsername;
  } else if (phone) {
    query = graphqlQuery(userGetByPhoneDoc(), "User get profile by phone", {
      variables: { phone },
      fetchPolicy: "network-only",
    });
    processedData = query.data?.getUserByPhone;
  }

  return { ...query, data: processedData };
}

export async function userUpdateProfile(values: Record<string, any>) {
  const response = await axiosPut(`/user/update/${values.userId}`, values);

  return response.data;
}
