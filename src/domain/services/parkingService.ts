import {
  parkingLotGetAllDoc,
  parkingLotGetByPhoneDoc,
  parkingLotGetByUsernameDoc,
  parkingLotGetByUuidDoc,
  parkingLotGetImagesByParkingLotUuidDoc,
} from "../gql-docs/parkingDocs";
import { userGetByParkingLotUuidDoc } from "../gql-docs/userDocs";
import { graphqlQuery } from "../infra/apis/graphqlActions";
import { restPost, restPut } from "../infra/apis/restAction";
import { AxiosResponseData } from "../models/AxiosModel";
import { CommonPageInfo, CommonVariables } from "../models/CommonModel";
import { Parking } from "../models/ParkingModel";
import { User } from "../models/UserModel";
import { userGetByParkingLotUuid } from "./userService";

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

export async function parkingLotGetAllWithOwners(variables: CommonVariables) {
  const query = await graphqlQuery(parkingLotGetAllDoc(), variables);

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

export async function parkingLotGetWithOwner(variables: {
  parkingLotUuid: string;
}) {
  const response = await parkingLotGetByUuid(variables);

  if (response.errors) {
    return response;
  }

  const parkingLot = response.data as Parking;

  const queryOwner = await userGetByParkingLotUuid(
    parkingLot.parkingLotUuid ?? ""
  );

  if (queryOwner.errors) {
    return queryOwner;
  }

  const owner = queryOwner.data as User;

  const data = { ...parkingLot, owner };

  return { data } as AxiosResponseData & { data: Parking & { owner: User } };
}

export async function parkingLotGetByUuid(variables: {
  parkingLotUuid: string;
}) {
  const query = await graphqlQuery(parkingLotGetByUuidDoc(), variables);

  if (query.data.errors) {
    return query.data;
  }

  const data = query.data.data.getParkingLotByUuid;

  return { data } as AxiosResponseData & Parking;
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

export async function parkingLotCreate(values: Record<string, any>) {
  const userUuid = values.userUuid;

  delete values.userUuid;

  const response = await restPost(`/parking-lot/create/${userUuid}`, values);

  return response.data;
}

export async function parkingLotUpdate(values: Record<string, any>) {
  const parkingLotUuid = values.parkingLotUuid;

  delete values.parkingLotUuid;

  const response = await restPut(
    `/parking-lot/update/${parkingLotUuid}`,
    values
  );

  return response.data;
}

export async function parkingLotVerify(parkingLotUuid: string) {
  const response = await restPut(`/parking-lot/verify/${parkingLotUuid}`, {});

  return response.data;
}

export async function parkingLotGetDonut() {
  const query = await graphqlQuery(parkingLotGetAllDoc(), { size: 100000 });

  if (query.data.errors) {
    return query.data;
  }

  const data = query.data.data.getParkingLots;

  const verified = data.content.filter((parkingLot: Parking) => {
    // If verifiedAt exists
    if (parkingLot.verifiedAt) {
      return true;
    }
    return false;
  });

  const series = [verified.length, data.content.length - verified.length];
  const labels = ["Verified", "Unverified"];

  return {
    data: {
      series,
      labels,
    },
  } as AxiosResponseData & {
    data: {
      series: number[];
      labels: string[];
    };
  };
}

export async function parkingLotUpdateRate(values: Record<string, any>) {
  const parkingLotUuid = values.parkingLotUuid;

  delete values.parkingLotUuid;

  const response = await restPost(`/rate/update/${parkingLotUuid}`, values);

  return response.data;
}

export async function parkingLotGetImagesByParkingLotUuid(
  variables: CommonVariables & { parkingLotUuid: string }
) {
  const query = await graphqlQuery(
    parkingLotGetImagesByParkingLotUuidDoc(),
    variables
  );

  if (query.data.errors) {
    return query.data;
  }

  const data = query.data.data.getParkingLotImageKeysByParkingLotUuid;

  return { data } as AxiosResponseData & {
    data: string[];
  };
}

export function parkingLotGetFilters() {
  return [
    {
      label: "Name, ASC",
      value: "name,1",
    },
    {
      label: "Name, DESC",
      value: "name,0",
    },
    {
      label: "Verified, ASC",
      value: "verifiedAt,1",
    },
    {
      label: "Verified, DESC",
      value: "verifiedAt,0",
    },
  ];
}
