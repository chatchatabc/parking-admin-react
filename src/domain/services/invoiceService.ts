import {
  invoiceGetAllByVehicleDoc,
  invoiceGetAllDoc,
  invoiceGetByParkingLotDoc,
  invoiceGetByUserDoc,
  invoiceGetDoc,
} from "../gql-docs/invoiceDocs";
import { graphqlQuery } from "../infra/apis/graphqlActions";
import { AxiosResponseData, AxiosResponseError } from "../models/AxiosModel";
import { CommonContent, CommonVariables } from "../models/CommonModel";
import { Invoice } from "../models/InvoiceModel";
import { parkingLotGetWithOwner } from "./parkingLotService";
import { vehicleGetWithAllInfo } from "./vehicleService";

export async function invoiceGetAll(variables: CommonVariables) {
  const query = await graphqlQuery(
    invoiceGetAllDoc(),
    variables,
    "InvoiceGetAll"
  );

  if (query.data.errors) {
    return query.data;
  }

  const data = query.data.data.getInvoices;
  const additionalInfo = data.content.map(async (invoice: Invoice) => {
    const parkingLot = await parkingLotGetWithOwner({
      id: invoice.parkingLotUuid ?? "",
    });

    if (!parkingLot.errors) {
      invoice.parkingLot = parkingLot.data;
    }

    const vehicle = await vehicleGetWithAllInfo({
      id: invoice.vehicleUuid ?? "",
    });

    if (!vehicle.errors) {
      invoice.vehicle = vehicle.data;
    }

    return invoice;
  });

  const content = await Promise.all(additionalInfo);
  data.content = content;

  return { data } as AxiosResponseData<CommonContent<Invoice>>;
}

export async function invoiceGetByParkingLot(
  variables: CommonVariables & { id: string }
) {
  const query = await graphqlQuery(
    invoiceGetByParkingLotDoc(),
    variables,
    "InvoiceGetByParkingLot"
  );

  if (query.data.errors) {
    return query.data;
  }

  const data = query.data.data.getInvoicesByParkingLot;
  const additionalInfo = data.content.map(async (invoice: Invoice) => {
    const parkingLot = await parkingLotGetWithOwner({
      id: invoice.parkingLotUuid ?? "",
    });

    if (!parkingLot.errors) {
      invoice.parkingLot = parkingLot.data;
    }

    const vehicle = await vehicleGetWithAllInfo({
      id: invoice.vehicleUuid ?? "",
    });

    if (!vehicle.errors) {
      invoice.vehicle = vehicle.data;
    }

    return invoice;
  });
  const invoicesWithParkingLot = await Promise.all(additionalInfo);

  return {
    data: { ...data, content: invoicesWithParkingLot },
  } as AxiosResponseData<CommonContent<Invoice>>;
}

export async function invoiceGetByUser(
  variables: CommonVariables & { id: string }
) {
  const query = await graphqlQuery(invoiceGetByUserDoc(), variables);

  if (query.data.errors) {
    return query.data;
  }

  const data = query.data.data.getInvoicesByUser;

  const additionalInfo = data.content.map(async (invoice: Invoice) => {
    const parkingLot = await parkingLotGetWithOwner({
      id: invoice.parkingLotUuid ?? "",
    });

    if (!parkingLot.errors) {
      invoice.parkingLot = parkingLot.data;
    }

    const vehicle = await vehicleGetWithAllInfo({
      id: invoice.vehicleUuid ?? "",
    });

    if (!vehicle.errors) {
      invoice.vehicle = vehicle.data;
    }

    return invoice;
  });
  const invoicesWithParkingLot = await Promise.all(additionalInfo);

  return {
    data: { ...data, content: invoicesWithParkingLot },
  } as AxiosResponseData<CommonContent<Invoice>>;
}

export async function invoiceGet(variables: { id: string }) {
  const query = await graphqlQuery(invoiceGetDoc(), variables, "InvoiceGet");

  if (query.data.errors) {
    return query.data as AxiosResponseError;
  }

  const data = query.data.data.getInvoice;

  return { data } as AxiosResponseData<Invoice>;
}

export async function invoiceGetAllByVehicle(
  variables: CommonVariables & { id: string }
) {
  const query = await graphqlQuery(
    invoiceGetAllByVehicleDoc(),
    variables,
    "InvoiceGetAllByVehicle"
  );

  if (query.data.errors) {
    return query.data;
  }

  const data = query.data.data.getInvoicesByVehicle;

  const additionalInfo = data.content.map(async (invoice: Invoice) => {
    const parkingLot = await parkingLotGetWithOwner({
      id: invoice.parkingLotUuid ?? "",
    });

    if (!parkingLot.errors) {
      invoice.parkingLot = parkingLot.data;
    }

    const vehicle = await vehicleGetWithAllInfo({
      id: invoice.vehicleUuid ?? "",
    });

    if (!vehicle.errors) {
      invoice.vehicle = vehicle.data;
    }

    return invoice;
  });

  data.content = await Promise.all(additionalInfo);

  return {
    data,
  } as AxiosResponseData<CommonContent<Invoice>>;
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
