import {
  vehicleGetAllByUserUuidDoc,
  vehicleGetAllDoc,
  vehicleGetTypeDoc,
  vehicleGetAllBrandDoc,
  vehicleGetAllTypeDoc,
  vehicleGetDoc,
  vehicleGetBrandDoc,
  vehicleGetModelDoc,
  vehicleGetAllModelDoc,
} from "../gql-docs/vehicleDocs";
import { graphqlQuery } from "../infra/apis/graphqlActions";
import { restPost, restPut } from "../infra/apis/restActions";
import { AxiosResponseData, AxiosResponseError } from "../models/AxiosModel";
import {
  CommonContent,
  CommonOptions,
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

export async function vehicleGet(variables: { keyword: string }) {
  const query = await graphqlQuery(vehicleGetDoc(), variables, "VehicleGet");

  if (query.data.errors) {
    return query.data as AxiosResponseError;
  }

  const data = query.data.data.getVehicle;

  return { data } as AxiosResponseData<Vehicle>;
}

export async function vehicleGetWithAllInfo(variables: { keyword: string }) {
  const query = await vehicleGet(variables);

  if (query.errors) {
    return query;
  }

  const vehicle = query.data;

  const user = await userGetByVehicle({ keyword: vehicle.vehicleUuid ?? "" });

  if (user.errors) {
    return user;
  }

  vehicle.owner = user.data;

  const model = await vehicleGetModel({ keyword: vehicle.modelUuid ?? "" });

  if (model.errors) {
    return model;
  }

  vehicle.model = model.data;

  return { data: vehicle } as AxiosResponseData<Vehicle>;
}

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

  const vehiclesPromise = data.content.map(async (vehicle: Vehicle) => {
    const user = await userGetByVehicle({ keyword: vehicle.vehicleUuid ?? "" });
    if (!user.errors) {
      vehicle.owner = user.data;
    }

    const model = await vehicleGetModel({ keyword: vehicle.modelUuid ?? "" });
    if (!model.errors) {
      vehicle.model = model.data;
    }

    return vehicle;
  });

  const content = await Promise.all(vehiclesPromise);

  data.content = content;

  return { data } as AxiosResponseData<CommonContent<Vehicle>>;
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

export async function vehicleVerify(values: Record<string, any>) {
  const { vehicleUuid, rejectionReason } = values;
  const values1 = { rejectionReason };

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
      keyword: vehicle.vehicleUuid ?? "",
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

export async function vehicleGetAllModel(variables: CommonVariables) {
  const query = await graphqlQuery(
    vehicleGetAllModelDoc(),
    variables,
    "VehicleGetAllModel"
  );

  if (query.data.errors) {
    return query.data as AxiosResponseError;
  }

  const data = query.data.data.getVehicleModels;

  const modelsPromise = data.content.map(async (model: VehicleModel) => {
    const brand = await vehicleGetBrand({ keyword: model.brandUuid ?? "" });

    if (!brand.errors) {
      model.brand = brand.data;
    }

    const type = await vehicleGetType({ keyword: model.typeUuid ?? "" });

    if (!type.errors) {
      model.type = type.data;
    }

    return model;
  });

  const content = await Promise.all(modelsPromise);

  data.content = content;

  return { data } as AxiosResponseData<CommonContent<VehicleModel>>;
}

export async function vehicleGetModel(variables: { keyword: string }) {
  const query = await graphqlQuery(
    vehicleGetModelDoc(),
    variables,
    "VehicleGetModel"
  );

  if (query.data.errors) {
    return query.data as AxiosResponseError;
  }

  const model = query.data.data.getVehicleModel;

  const brand = await vehicleGetBrand({ keyword: model.brandUuid ?? "" });

  if (brand.errors) {
    return brand;
  }

  model.brand = brand.data;

  const type = await vehicleGetType({ keyword: model.typeUuid ?? "" });

  if (type.errors) {
    return type;
  }

  model.type = type.data;

  return { data: model } as AxiosResponseData<VehicleModel>;
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
  const query = await vehicleGetAllType({ page: 0, size: 100000 });

  if (query.errors) {
    return query;
  }

  const data = query.data.content.map((type) => {
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
  const query = await graphqlQuery(vehicleGetAllBrandDoc(), params);

  if (query.data.errors) {
    return query.data as AxiosResponseError;
  }

  const data = query.data.data.getVehicleBrands;

  return { data } as AxiosResponseData<CommonContent<VehicleBrand>>;
}

export async function vehicleGetBrand(variables: { keyword: string }) {
  const query = await graphqlQuery(
    vehicleGetBrandDoc(),
    variables,
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
