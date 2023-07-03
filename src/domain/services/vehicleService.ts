import {
  vehicleGetAllByUserUuidDoc,
  vehicleGetAllDoc,
  vehicleGetTypeDoc,
  vehicleGetAllBrandDoc,
  vehicleGetBrandByIdDoc,
  vehicleGetAllTypeDoc,
  vehicleGetTypeByIdDoc,
  vehicleGetAllModelDoc,
  vehicleGetModelDoc,
  vehicleGetAllModelByBrandDoc,
} from "../gql-docs/vehicleDocs";
import { graphqlQuery } from "../infra/apis/graphqlActions";
import { restPost, restPut } from "../infra/apis/restActions";
import { AxiosResponseData, AxiosResponseError } from "../models/AxiosModel";
import { CommonContent, CommonVariables } from "../models/CommonModel";
import { User } from "../models/UserModel";
import {
  Vehicle,
  VehicleBrand,
  VehicleModel,
  VehicleType,
} from "../models/VehicleModel";
import { userGetByVehicle } from "./userService";

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
    "VehicleGetType"
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

    const queryOwner = await userGetByVehicle({
      id: vehicle.vehicleUuid ?? "",
    });

    if (queryOwner.data.errors) {
      return newVehicle;
    }

    newVehicle.owner = queryOwner.data;
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

export async function vehicleGetAllBrand(params: CommonVariables) {
  const query = await graphqlQuery(vehicleGetAllBrandDoc(), params);

  if (query.data.errors) {
    return query.data as AxiosResponseError;
  }

  const data = query.data.data.getVehicleBrands;

  return { data } as AxiosResponseData<CommonContent<VehicleBrand>>;
}

export async function vehicleGetBrandById(params: { id: string }) {
  const query = await graphqlQuery(
    vehicleGetBrandByIdDoc(),
    params,
    "VehicleGetBrand"
  );

  if (query.data.errors) {
    return query.data as AxiosResponseError;
  }

  const data = query.data.data.getVehicleBrand;

  return { data } as AxiosResponseData<VehicleBrand>;
}

export async function vehicleCreateBrand(values: Record<string, any>) {
  values = {
    name: values.name,
    status: values.status,
  };

  const response = await restPost("/vehicle-brand", values);

  return response.data;
}

export async function vehicleUpdateBrand(params: Record<string, any>) {
  const values = {
    name: params.name,
    status: params.status,
  };

  const response = await restPut(`/vehicle-brand/${params.brandUuid}`, values);

  return response.data;
}

export function vehicleGetAllBrandOptions() {
  return [
    {
      label: "Active",
      value: 1,
    },
    {
      label: "Draft",
      value: 0,
    },
    {
      label: "Inactive",
      value: -1,
    },
  ];
}

export async function vehicleGetAllType(params: CommonVariables) {
  const query = await graphqlQuery(vehicleGetAllTypeDoc(), params);

  if (query.data.errors) {
    return query.data as AxiosResponseError;
  }

  const data = query.data.data.getVehicleTypes;

  return { data } as AxiosResponseData<CommonContent<VehicleType>>;
}

export async function vehicleGetTypeById(params: { id: string }) {
  const query = await graphqlQuery(vehicleGetTypeByIdDoc(), params);

  if (query.data.errors) {
    return query.data as AxiosResponseError;
  }

  const data = query.data.data.getVehicleType;

  return { data } as AxiosResponseData<VehicleType>;
}

export async function vehicleCreateType(values: Record<string, any>) {
  values = {
    name: values.name,
    status: values.status,
  };

  const response = await restPost("/vehicle-type", values);

  return response.data;
}

export async function vehicleUpdateType(params: Record<string, any>) {
  const values = {
    name: params.name,
    status: params.status,
  };

  const response = await restPut(`/vehicle-type/${params.typeUuid}`, values);

  return response.data;
}

export function vehicleGetAllTypeOptions() {
  return [
    {
      label: "Active",
      value: 1,
    },
    {
      label: "Draft",
      value: 0,
    },
    {
      label: "Inactive",
      value: -1,
    },
  ];
}

export async function vehicleGetAllModel(params: CommonVariables) {
  const query = await graphqlQuery(
    vehicleGetAllModelDoc(),
    params,
    "VehicleGetModel"
  );

  if (query.data.errors) {
    return query.data as AxiosResponseError;
  }

  const data = query.data.data.getVehicleModels;

  return { data } as AxiosResponseData<CommonContent<VehicleModel>>;
}

export async function vehicleGetAllModelWithBrand(params: CommonVariables) {
  const query = await vehicleGetAllModel(params);

  if (query.errors) {
    return query;
  }

  // Add brand info to each model
  const models = query.data.content as VehicleModel[];
  const additionalInfo = models.map(async (model) => {
    const newModel: VehicleModel = {
      ...model,
    };
    console.log(model);
    const queryBrand = await vehicleGetBrandById({ id: model.brandUuid ?? "" });
    console.log(queryBrand);
    if (queryBrand.errors) {
      return newModel;
    }

    newModel.brand = queryBrand.data;
    return newModel;
  });

  // Wait for all promises to resolve
  const newContent = await Promise.all(additionalInfo);
  const data = { ...query.data, content: newContent };

  return { data } as AxiosResponseData<CommonContent<VehicleModel>>;
}

export async function vehicleGetModel(params: { id: string }) {
  const query = await graphqlQuery(vehicleGetModelDoc(), params);

  if (query.data.errors) {
    return query.data as AxiosResponseError;
  }

  const data = query.data.data.getVehicleModel;

  return { data } as AxiosResponseData<VehicleType>;
}

export async function vehicleGetAllModelByBrand(params: CommonVariables) {
  const query = await graphqlQuery(vehicleGetAllModelByBrandDoc(), params);

  if (query.data.errors) {
    return query.data as AxiosResponseError;
  }

  const data = query.data.data.getVehicleModels;

  return { data } as AxiosResponseData<CommonContent<VehicleType>>;
}

export async function vehicleCreateModel(values: Record<string, any>) {
  values = {
    name: values.name,
    status: values.status,
    brandUuid: values.brandUuid,
  };

  const response = await restPost("/vehicle-model", values);

  return response.data;
}

export async function vehicleUpdateModel(params: Record<string, any>) {
  const values = {
    name: params.name,
    status: params.status,
    brandUuid: params.brandUuid,
  };

  const response = await restPut(`/vehicle-model/${params.modelUuid}`, values);

  return response.data;
}

export function vehicleGetAllModelOptions() {
  return [
    {
      label: "Active",
      value: 1,
    },
    {
      label: "Draft",
      value: 0,
    },
    {
      label: "Inactive",
      value: -1,
    },
  ];
}
