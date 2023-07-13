import { invoiceGetDoc } from "../gql-docs/invoiceDocs";
import { graphqlQuery } from "../infra/apis/graphqlActions";
import { restGet } from "../infra/apis/restActions";
import {
  AxiosResponse,
  AxiosResponseData,
  AxiosResponseError,
} from "../models/AxiosModel";
import { CommonPagination, CommonVariables } from "../models/CommonModel";
import { Invoice } from "../models/InvoiceModel";
import { parkingLotGet, parkingLotGetWithOwner } from "./parkingLotService";
import { vehicleGet, vehicleGetWithAllInfo } from "./vehicleService";

export async function invoiceGetAll(params: CommonVariables) {
  const response: AxiosResponse<CommonPagination<Invoice>> = await restGet(
    "/invoice",
    params,
    "InvoiceGetAll"
  );

  if (response.data.errors) {
    return response.data;
  }

  const contentPromise = response.data.data.content.map(async (invoice) => {
    return await invoiceGetAllInfo(invoice);
  });

  response.data.data.content = await Promise.all(contentPromise);

  return response.data;
}

export async function invoiceGetAllInfo(invoice: Invoice) {
  const parkingLot = await parkingLotGet({ id: invoice.parkingLotUuid ?? "" });
  if (!parkingLot.errors) {
    invoice.parkingLot = parkingLot.data;
  }

  const vehicle = await vehicleGet({ id: invoice.vehicleUuid ?? "" });
  if (!vehicle.errors) {
    invoice.vehicle = vehicle.data;
  }

  return invoice;
}

export async function invoiceGetAllByParkingLot(
  params: CommonVariables & { id: string }
) {
  const { id, ...values } = params;

  const response: AxiosResponse<CommonPagination<Invoice>> = await restGet(
    `/invoice/parking-lot/${id}`,
    values,
    "InvoiceGetByParkingLot"
  );

  if (response.data.errors) {
    return response.data;
  }

  const contentPromise = response.data.data.content.map(async (invoice) => {
    return await invoiceGetAllInfo(invoice);
  });

  response.data.data.content = await Promise.all(contentPromise);

  return response.data;
}

export async function invoiceGetAllByUser(
  params: CommonVariables & { id: string }
) {
  const { id, ...values } = params;

  const response: AxiosResponse<CommonPagination<Invoice>> = await restGet(
    `/invoice/user/${id}`,
    values,
    "InvoiceGetAll"
  );

  if (response.data.errors) {
    return response.data;
  }

  const contentPromise = response.data.data.content.map(async (invoice) => {
    const parkingLot = await parkingLotGet({
      id: invoice.parkingLotUuid ?? "",
    });
    if (!parkingLot.errors) {
      invoice.parkingLot = parkingLot.data;
    }

    const vehicle = await vehicleGet({
      id: invoice.vehicleUuid ?? "",
    });
    if (!vehicle.errors) {
      invoice.vehicle = vehicle.data;
    }

    return invoice;
  });
  const content = await Promise.all(contentPromise);

  response.data.data.content = content;

  return response.data;
}

export async function invoiceGet(params: { id: string }) {
  const { id, ...values } = params;
  const response: AxiosResponse<Invoice> = await restGet(
    `/invoice/${id}`,
    values,
    "InvoiceGet"
  );

  if (response.data.errors) {
    return response.data;
  }

  response.data.data = await invoiceGetAllInfo(response.data.data);

  return response.data;
}

export async function invoiceGetAllByVehicle(
  params: CommonVariables & { id: string }
) {
  const { id, ...values } = params;

  const response: AxiosResponse<CommonPagination<Invoice>> = await restGet(
    `/invoice/vehicle/${id}`,
    values,
    "InvoiceGet"
  );

  if (response.data.errors) {
    return response.data;
  }

  const contentPromise = response.data.data.content.map(async (invoice) => {
    return await invoiceGetAllInfo(invoice);
  });

  response.data.data.content = await Promise.all(contentPromise);

  return response.data;
}

export async function invoiceGetWithAllInfo(variables: { id: string }) {
  const query = await invoiceGet(variables);
  if (query.errors) {
    return query;
  }
  const invoice = query.data as Invoice;

  const queryParkingLot = await parkingLotGetWithOwner({
    id: invoice.parkingLotUuid ?? "",
  });
  if (queryParkingLot.errors) {
    return queryParkingLot;
  }
  invoice.parkingLot = queryParkingLot.data;

  const queryVehicle = await vehicleGetWithAllInfo({
    id: invoice.vehicleUuid ?? "",
  });
  if (queryVehicle.errors) {
    return queryVehicle;
  }
  invoice.vehicle = queryVehicle.data;

  return { data: invoice } as AxiosResponseData<Invoice>;
}
