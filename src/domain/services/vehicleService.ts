import {
  restGet,
  restPost,
  restPostFormData,
  restPut,
} from "../infra/apis/restActions";
import {
  AxiosResponse,
  AxiosResponseData,
  AxiosResponseError,
} from "../models/AxiosModel";
import {
  CommonOptions,
  CommonPagination,
  CommonVariables,
} from "../models/CommonModel";
import { User } from "../models/UserModel";
import {
  Vehicle,
  VehicleBrand,
  VehicleModel,
  VehicleType,
} from "../models/VehicleModel";
import { userGetByVehicle } from "./userService";

export async function vehicleGetAllInfo(vehicle: Vehicle) {
  const model = await vehicleGetModel({ id: vehicle.modelUuid ?? "" });
  if (!model.errors) {
    vehicle.model = model.data;
  }

  const user = await userGetByVehicle({ id: vehicle.vehicleUuid ?? "" });
  if (!user.errors) {
    vehicle.owner = user.data;
  }

  return vehicle;
}

export async function vehicleGet(params: { id: string }) {
  const { id, ...values } = params;

  const response: AxiosResponse<Vehicle> = await restGet(
    `/vehicle/${id}`,
    values,
    "VehicleGet"
  );

  if (response.data.errors) {
    return response.data;
  }

  response.data.data = await vehicleGetAllInfo(response.data.data);

  return response.data;
}

export async function vehicleGetWithAllInfo(variables: { id: string }) {
  const query = await vehicleGet(variables);

  if (query.errors) {
    return query;
  }

  const vehicle = query.data;

  const user = await userGetByVehicle({ id: vehicle.vehicleUuid ?? "" });

  if (user.errors) {
    return user;
  }

  vehicle.owner = user.data;

  const model = await vehicleGetModel({ id: vehicle.modelUuid ?? "" });

  if (model.errors) {
    return model;
  }

  vehicle.model = model.data;

  return { data: vehicle } as AxiosResponseData<Vehicle>;
}

export async function vehicleGetAll(params: CommonVariables) {
  const response: AxiosResponse<CommonPagination<Vehicle>> = await restGet(
    "/vehicle",
    params,
    "VehicleGetAll"
  );

  if (response.data.errors) {
    return response.data;
  }

  const contentPromise = response.data.data.content.map(async (vehicle) => {
    return await vehicleGetAllInfo(vehicle);
  });

  response.data.data.content = await Promise.all(contentPromise);

  return response.data;
}

export async function vehicleGetType(params: { id: string }) {
  const { id, ...values } = params;

  const response: AxiosResponse<VehicleType> = await restGet(
    `/vehicle-type/${id}`,
    values,
    "VehicleGetType"
  );

  return response.data;
}

export async function vehicleVerify(values: Record<string, any>) {
  const { vehicleUuid, rejectionReason, status } = values;
  const values1 = { rejectionReason, status };

  const response = await restPut(
    `/vehicle/verify/${vehicleUuid}`,
    values1,
    "VehicleVerify"
  );

  if (response.data.errors) {
    return response.data as AxiosResponseError;
  }

  const data = response.data;

  return { data } as AxiosResponseData<any>;
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

    if (queryOwner.errors) {
      return newVehicle;
    }

    newVehicle.owner = queryOwner.data;
    return newVehicle;
  });

  const vehiclesWithOwner = await Promise.all(additionalInfo);

  return { data: { ...query.data, content: vehiclesWithOwner } };
}

export async function vehicleGetAllByUser(
  params: CommonVariables & { id: string }
) {
  const { id, ...values } = params;

  const response: AxiosResponse<CommonPagination<Vehicle>> = await restGet(
    `/vehicle/owner/${id}`,
    values,
    "VehicleGetAllByUser"
  );

  if (response.data.errors) {
    return response.data;
  }

  const contentPromise = response.data.data.content.map(async (vehicle) => {
    const model = await vehicleGetModel({ id: vehicle.modelUuid ?? "" });
    if (!model.errors) {
      vehicle.model = model.data;
    }
    return vehicle;
  });

  const content = await Promise.all(contentPromise);
  response.data.data.content = content;

  return response.data;
}

export async function vehicleGetAllModel(params: CommonVariables) {
  const response: AxiosResponse<CommonPagination<VehicleModel>> = await restGet(
    "/vehicle-model",
    params,
    "VehicleGetAllModel"
  );

  if (response.data.errors) {
    return response.data;
  }

  const contentPromise = response.data.data.content.map(
    async (vehicleModel) => {
      return await vehicleGetModelAllInfo(vehicleModel);
    }
  );

  response.data.data.content = await Promise.all(contentPromise);

  return response.data;
}

export async function vehicleGetModelAllInfo(vehicleModel: VehicleModel) {
  const brand = await vehicleGetBrand({ id: vehicleModel.brandUuid ?? "" });
  if (!brand.errors) {
    vehicleModel.brand = brand.data;
  }

  const type = await vehicleGetType({ id: vehicleModel.typeUuid ?? "" });
  if (!type.errors) {
    vehicleModel.type = type.data;
  }

  return vehicleModel;
}

export async function vehicleGetModel(params: { id: string }) {
  const { id, ...values } = params;

  const response: AxiosResponse<VehicleModel> = await restGet(
    `/vehicle-model/${id}`,
    values,
    "VehicleGetModel"
  );
  if (response.data.errors) {
    return response.data;
  }

  response.data.data = await vehicleGetModelAllInfo(response.data.data);

  return response.data;
}

export async function vehicleCreateModel(values: Record<string, any>) {
  const { name, brandUuid, status, typeUuid } = values;
  const data = { name, brandUuid, status, typeUuid };

  const response = await restPost("/vehicle-model", data);

  return response.data;
}

export async function vehicleUpdate(values: Record<string, any>) {
  const { name, plateNumber, modelUuid, color, year, vehicleUuid } = values;
  const data = { name, plateNumber, modelUuid, color, year };

  const response = await restPut(`/vehicle/${vehicleUuid}`, data);

  return response.data;
}

export async function vehicleUpdateModel(values: Record<string, any>) {
  const { name, brandUuid, status, typeUuid, modelUuid } = values;
  const data = { name, brandUuid, status, typeUuid };

  const response = await restPost(`/vehicle-model/${modelUuid}`, data);

  return response.data;
}

export async function vehicleOptionsTypeUuid() {
  const response = await vehicleGetAllType({ page: 0, size: 100000 });

  if (response.errors) {
    return response;
  }

  const data = response.data.content.map((type) => {
    return {
      label: type.name,
      value: type.typeUuid,
    };
  });

  return { data } as AxiosResponseData<CommonOptions[]>;
}

export async function vehicleOptionsModelUuid() {
  const query = await vehicleGetAllModel({ page: 0, size: 100000 });

  if (query.errors) {
    return query;
  }

  const data = query.data.content.map((model) => {
    return {
      label: model.name,
      value: model.modelUuid,
    };
  });

  return { data } as AxiosResponseData<CommonOptions[]>;
}

export async function vehicleOptionsBrandUuid() {
  const query = await vehicleGetAllBrand({ page: 0, size: 100000 });

  if (query.errors) {
    return query;
  }

  const data = query.data.content.map((brand) => {
    return {
      label: brand.name,
      value: brand.brandUuid,
    };
  });

  return { data } as AxiosResponseData<CommonOptions[]>;
}

export async function vehicleCreate(values: Record<string, any>) {
  const { userUuid, name, plateNumber, modelUuid, color, year } = values;
  const data = { name, plateNumber, modelUuid, color, year };

  const response = await restPost(`/vehicle/${userUuid}`, data);

  return response.data;
}

export async function vehicleGetAllBrand(params: CommonVariables) {
  const response: AxiosResponse<CommonPagination<VehicleBrand>> = await restGet(
    "/vehicle-brand",
    params,
    "VehicleGetAllBrand"
  );

  return response.data;
}

export async function vehicleUpdateBrandLogo(params: Record<string, any>) {
  const { brandUuid, file } = params;

  const response = await restPostFormData(
    `/vehicle-brand/upload-logo/${brandUuid}`,
    { file },
    "VehicleUpdateBrandLogo"
  );

  return response.data;
}

export async function vehicleGetBrand(params: { id: string }) {
  const { id, ...values } = params;

  const response: AxiosResponse<VehicleBrand> = await restGet(
    `/vehicle-brand/${id}`,
    values,
    "VehicleGetBrand"
  );

  return response.data;
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
  const response: AxiosResponse<CommonPagination<VehicleType>> = await restGet(
    `/vehicle-type`,
    params,
    "VehicleGetAllType"
  );

  return response.data;
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

export function vehicleOptionsModelStatus() {
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
