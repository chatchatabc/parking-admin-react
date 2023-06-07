import { invoiceGetAllDoc } from "../gql-docs/invoiceDocs";
import { graphqlQuery } from "../infra/apis/graphqlActions";
import { AxiosResponseData } from "../models/AxiosModel";
import { CommonPageInfo, CommonVariables } from "../models/CommonModel";
import { Invoice } from "../models/InvoiceModel";
import { Parking } from "../models/ParkingModel";
import { User } from "../models/UserModel";
import { userGetByParkingLotUuid } from "./userService";

export async function invoiceGetAll(variables: CommonVariables) {
  const query = await graphqlQuery(invoiceGetAllDoc(), variables);

  if (query.data.errors) {
    return query.data;
  }

  const data = query.data.data.getInvoices;
  const additionalInfo = data.content.map(async (invoice: Invoice) => {
    const parkingLot: Parking & { owner: User } = {
      ...invoice.parkingLot,
      owner: {},
    };

    const ownerQuery = await userGetByParkingLotUuid(
      parkingLot.parkingLotUuid ?? ""
    );

    if (!ownerQuery.errors) {
      parkingLot.owner = ownerQuery.data;
    }

    return {
      ...invoice,
      parkingLot,
    };
  });

  const invoicesWithParkingLot = await Promise.all(additionalInfo);

  return {
    data: { ...data, content: invoicesWithParkingLot },
  } as AxiosResponseData & {
    data: {
      content: (Invoice & { parkingLot: Parking & { owner: User } })[];
      pageInfo: CommonPageInfo;
    };
  };
}
