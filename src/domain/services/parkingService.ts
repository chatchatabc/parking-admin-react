import {
  parkingLotGetAllDoc,
  parkingLotGetByPhoneDoc,
  parkingLotGetByUsernameDoc,
} from "../gql-docs/parkingDocs";
import { userGetByParkingLotUuidDoc } from "../gql-docs/userDocs";
import { graphqlQuery } from "../infra/apis/graphqlActions";
import { restPost } from "../infra/apis/restAction";
import { AxiosResponseData } from "../models/AxiosModel";
import { CommonPageInfo } from "../models/CommonModel";
import { Parking } from "../models/ParkingModel";
import { User } from "../models/UserModel";

export async function parkingLotGetAll({
  page = 0,
  size = 10,
  keyword = "",
}: Record<string, any>) {
  const query = await graphqlQuery(parkingLotGetAllDoc(), {
    page,
    size,
    keyword,
  });

  if (query.data.errors) {
    return query.data;
  }

  const data = query.data.data.getParkingLots;

  return { data } as AxiosResponseData & {
    data: {
      content: Parking[];
      pageInfo: CommonPageInfo;
    };
  };
}

export async function parkingLotGetAllWithOwners({
  page = 0,
  size = 10,
  keyword = undefined,
}: Record<string, any>) {
  const query = await graphqlQuery(parkingLotGetAllDoc(), {
    page,
    size,
    keyword,
  });

  if (query.data.errors) {
    return query.data;
  }

  // Add owner info to each parking lot
  const parkingLots = query.data.data.getParkingLots.content as Parking[];
  const additionalInfo = parkingLots.map(async (parkingLot) => {
    const newParkingLot: Parking & { owner: User } = {
      ...parkingLot,
      owner: {},
    };

    const queryOwner = await graphqlQuery(userGetByParkingLotUuidDoc(), {
      parkingLotUuid: parkingLot.parkingLotUuid,
    });

    if (queryOwner.data.errors) {
      return newParkingLot;
    }

    newParkingLot.owner = queryOwner.data.data.getUserByParkingLotUuid;
    return newParkingLot;
  });

  // Wait for all promises to resolve
  const newContent = await Promise.all(additionalInfo);
  const data = { ...query.data.data.getParkingLots, content: newContent };

  return { data } as AxiosResponseData & {
    data: {
      content: (Parking & { owner: User })[];
      pageInfo: CommonPageInfo;
    };
  };
}

export async function parkingLotGet({
  username = "",
  phone = "",
}: {
  username?: string;
  phone?: string;
}) {
  let response, data;

  if (username) {
    response = await graphqlQuery(parkingLotGetByUsernameDoc(), { username });

    if (response.data.errors) {
      return response.data;
    }

    data = response.data.data.getParkingLotByUsername;
  } else if (phone) {
    response = await graphqlQuery(parkingLotGetByPhoneDoc(), { phone });

    if (response.data.errors) {
      return response.data;
    }

    data = response.data.data.getParkingLotByPhone;
  } else {
    return {
      errors: [
        {
          message: "username or phone is required",
        },
      ],
    };
  }

  return { data } as AxiosResponseData & Parking;
}

export async function parkingCreate(values: Record<string, any>) {
  const userUuid = values.userUuid;

  delete values.userUuid;

  const response = await restPost(`/parking-lot/create/${userUuid}`, values);

  return response.data;
}
