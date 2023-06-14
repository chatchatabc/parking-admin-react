import {
  vehicleGetAllByUserUuidDoc,
  vehicleGetAllDoc,
} from "../gql-docs/vehicleDocs";
import { graphqlQuery } from "../infra/apis/graphqlActions";
import { restPost } from "../infra/apis/restAction";
import { AxiosResponseData, AxiosResponseError } from "../models/AxiosModel";
import { CommonContent, CommonVariables } from "../models/CommonModel";
import { User } from "../models/UserModel";
import { Vehicle } from "../models/VehicleModel";

export async function vehicleGetAll(params: CommonVariables) {
  const query = await graphqlQuery(vehicleGetAllDoc(), params);

  if (query.data.errors) {
    return query.data as AxiosResponseError;
  }

  const data = query.data.data.getVehicles;

  return { data } as AxiosResponseData<CommonContent<Vehicle>>;
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

export async function vehicleGetAllByUserUuid(
  params: CommonVariables & { userUuid: string }
) {
  const query = await graphqlQuery(vehicleGetAllByUserUuidDoc(), params);

  if (query.data.errors) {
    return query.data;
  }

  const data = query.data.data.getVehiclesByOwner;

  return { data } as AxiosResponseData<CommonContent<Vehicle>>;
}

export async function vehicleCreate(values: Record<string, any>) {
  const { userUuid } = values;

  delete values.userUuid;

  const response = await restPost(`/vehicle/register/${userUuid}`, values);

  return response.data;
}
