import {
  invoiceGetAllDoc,
  invoiceGetByParkingLotDoc,
  invoiceGetByUserUuidDoc,
} from "../gql-docs/invoiceDocs";
import { graphqlQuery } from "../infra/apis/graphqlActions";
import { AxiosResponseData } from "../models/AxiosModel";
import { CommonContent, CommonVariables } from "../models/CommonModel";
import { Invoice } from "../models/InvoiceModel";
import { ParkingLot } from "../models/ParkingModel";
import { User } from "../models/UserModel";
import { parkingLotGetWithOwner } from "./parkingLotService";

export async function invoiceGetAll(variables: CommonVariables) {
  const query = await graphqlQuery(invoiceGetAllDoc(), variables);

  if (query.data.errors) {
    return query.data;
  }

  const data = query.data.data.getInvoices;
  const additionalInfo = data.content.map(async (invoice: Invoice) => {
    const parkingLot = await parkingLotGetWithOwner({
      parkingLotUuid: invoice.parkingLotUuid ?? "",
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
  } as AxiosResponseData<CommonContent<Invoice<ParkingLot<User>>>>;
}

export async function invoiceGetByParkingLot(variables: CommonVariables) {
  const query = await graphqlQuery(invoiceGetByParkingLotDoc(), variables);

  if (query.data.errors) {
    return query.data;
  }

  const data = query.data.data.getInvoicesByParkingLot;
  const additionalInfo = data.content.map(async (invoice: Invoice) => {
    const parkingLot = await parkingLotGetWithOwner({
      parkingLotUuid: invoice.parkingLotUuid ?? "",
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
  } as AxiosResponseData<CommonContent<Invoice<ParkingLot<User>>>>;
}

export async function invoiceGetByUserUuid(variables: CommonVariables) {
  const query = await graphqlQuery(invoiceGetByUserUuidDoc(), variables);

  if (query.data.errors) {
    return query.data;
  }

  const data = query.data.data.getInvoicesByUserUuid;
  const additionalInfo = data.content.map(async (invoice: Invoice) => {
    const parkingLot = await parkingLotGetWithOwner({
      parkingLotUuid: invoice.parkingLotUuid ?? "",
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
  } as AxiosResponseData<CommonContent<Invoice<ParkingLot<User>>>>;
}
