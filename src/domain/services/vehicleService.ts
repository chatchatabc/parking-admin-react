import { vehicleGetAllDoc } from "../gql-docs/vehicleDocs";
import { graphqlQuery } from "../infra/apis/graphqlActions";
import { AxiosResponseData } from "../models/AxiosModel";
import { CommonPageInfo, CommonVariables } from "../models/CommonModel";
import { User } from "../models/UserModel";
import { Vehicle } from "../models/VehicleModel";

export async function vehicleGetAll(params: CommonVariables) {
  const query = await graphqlQuery(vehicleGetAllDoc(), params);

  if (query.data.errors) {
    return query.data;
  }

  const data = query.data.data.getVehicles;

  return { data } as AxiosResponseData & {
    data: {
      content: Vehicle[];
      pageInfo: CommonPageInfo;
    };
  };
}

export async function vehicleGetAllWithOwner(params: CommonVariables) {
  const query = await vehicleGetAll(params);

  if (query.errors) {
    return query;
  }

  const vehicles = query.data.content;

  const additionalInfo = vehicles.map(async (vehicle) => {
    const newVehicle: Vehicle & { owner: User } = {
      ...vehicle,
      owner: {},
    };

    return newVehicle;
  });

  const vehiclesWithOwner = await Promise.all(additionalInfo);

  return { data: { ...query.data, content: vehiclesWithOwner } };
}
