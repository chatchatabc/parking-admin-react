import {
  vehicleGetAllByUserUuidDoc,
  vehicleGetAllDoc,
  vehicleGetTypeDoc,
} from "../gql-docs/vehicleDocs";
import { graphqlQuery } from "../infra/apis/graphqlActions";
import { restPost } from "../infra/apis/restActions";
import { AxiosResponseData, AxiosResponseError } from "../models/AxiosModel";
import { CommonContent, CommonVariables } from "../models/CommonModel";
import { User } from "../models/UserModel";
import { Vehicle, VehicleType } from "../models/VehicleModel";

export async function vehicleGetAll(variables: CommonVariables) {
  const query = await graphqlQuery(
    vehicleGetAllDoc(),
    variables,
    "VehicleGetAll"
  );

  if (query.data.errors) {
    return query.data as AxiosResponseError;
  }

  const data = query.data.data.getVehicles;

  return { data } as AxiosResponseData<CommonContent<Vehicle>>;
}

export async function vehicleGetAllWithTypes(variables: CommonVariables) {
  const vehicles = await vehicleGetAll(variables);

  if (vehicles.errors) {
    return vehicles;
  }

  const contentPromise = vehicles.data.content.map(async (vehicle) => {
    const type = await vehicleGetType({ keyword: vehicle.typeUuid ?? "" });

    if (!type.errors) {
      vehicle.type = type.data;
    }

    return vehicle;
  });

  const content = await Promise.all(contentPromise);

  return { data: { ...vehicles.data, content } } as AxiosResponseData<
    CommonContent<Vehicle>
  >;
}

export async function vehicleGetType(variables: { keyword: string }) {
  const query = await graphqlQuery(
    vehicleGetTypeDoc(),
    variables,
    "VehicleType"
  );

  if (query.data.errors) {
    return query.data as AxiosResponseError;
  }

  const data = query.data.data.getVehicleType;

  return { data } as AxiosResponseData<VehicleType>;
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
