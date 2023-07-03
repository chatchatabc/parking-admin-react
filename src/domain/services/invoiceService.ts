import {
  invoiceGetAllDoc,
  invoiceGetByParkingLotDoc,
  invoiceGetByUserDoc,
  invoiceGetDoc,
} from "../gql-docs/invoiceDocs";
import { graphqlQuery } from "../infra/apis/graphqlActions";
import { AxiosResponseData, AxiosResponseError } from "../models/AxiosModel";
import { CommonContent, CommonVariables } from "../models/CommonModel";
import { Invoice } from "../models/InvoiceModel";
import { parkingLotGet, parkingLotGetWithOwner } from "./parkingLotService";
import { vehicleGet } from "./vehicleService";

export async function invoiceGetAll(variables: CommonVariables) {
  const query = await graphqlQuery(invoiceGetAllDoc(), variables);

  if (query.data.errors) {
    return query.data;
  }

  const data = query.data.data.getInvoices;
  const additionalInfo = data.content.map(async (invoice: Invoice) => {
    const parkingLot = await parkingLotGetWithOwner({
      keyword: invoice.parkingLotUuid ?? "",
    });

    if (parkingLot.errors) {
      return invoice;
    }

    return {
      ...invoice,
      parkingLot: parkingLot.data,
    };
  });
  const invoicesWithParkingLot = await Promise.all(additionalInfo);

  return {
    data: { ...data, content: invoicesWithParkingLot },
  } as AxiosResponseData<CommonContent<Invoice>>;
}

export async function invoiceGetByParkingLot(variables: CommonVariables) {
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
      keyword: invoice.parkingLotUuid ?? "",
    });

    if (parkingLot.errors) {
      return invoice;
    }

    return {
      ...invoice,
      parkingLot: parkingLot.data,
    };
  });
  const invoicesWithParkingLot = await Promise.all(additionalInfo);

  return {
    data: { ...data, content: invoicesWithParkingLot },
  } as AxiosResponseData<CommonContent<Invoice>>;
}

export async function invoiceGetByUser(variables: CommonVariables) {
  const query = await graphqlQuery(invoiceGetByUserDoc(), variables);

  if (query.data.errors) {
    return query.data;
  }

  const data = query.data.data.getInvoicesByUser;
  const additionalInfo = data.content.map(async (invoice: Invoice) => {
    const parkingLot = await parkingLotGetWithOwner({
      keyword: invoice.parkingLotUuid ?? "",
    });

    if (parkingLot.errors) {
      return invoice;
    }

    return {
      ...invoice,
      parkingLot: parkingLot.data,
    };
  });
  const invoicesWithParkingLot = await Promise.all(additionalInfo);

  return {
    data: { ...data, content: invoicesWithParkingLot },
  } as AxiosResponseData<CommonContent<Invoice>>;
}

export async function invoiceGet(variables: { keyword: string }) {
  const query = await graphqlQuery(invoiceGetDoc(), variables, "InvoiceGet");

  if (query.data.errors) {
    return query.data as AxiosResponseError;
  }

  const data = query.data.data.getInvoice;

  return { data } as AxiosResponseData<Invoice>;
}

export async function invoiceGetWithAllInfo(variables: { keyword: string }) {
  const query = await invoiceGet(variables);
  if (query.errors) {
    return query;
  }
  const invoice = query.data as Invoice;

  const queryParkingLot = await parkingLotGet({
    keyword: invoice.parkingLotUuid ?? "",
  });
  if (queryParkingLot.errors) {
    return queryParkingLot;
  }
  invoice.parkingLot = queryParkingLot.data;

  const queryVehicle = await vehicleGet({ keyword: invoice.vehicleUuid ?? "" });
  if (queryVehicle.errors) {
    return queryVehicle;
  }
  invoice.vehicle = queryVehicle.data;

  return { data: invoice } as AxiosResponseData<Invoice>;
}
