import Realm from "realm";
class CustomerSchema extends Realm.Object<CustomerSchema> {
    _id!: string;
    name!: string;
    whatsappName?: string;
    whatsappNumber?: string;
    lastSessionSelection?: string;
    currentSession?:string;
    previewUrl?:string;
    lastCvDetails?:string;
    lastjobDescription?:string;

static schema = {
    name: "Customers",
    properties: {
      _id: "string",
      whatsappName: "string",
      whatsappNumber: "string",
      lastSessionSelection: "string",
      currentSession:"string",
      previewUrl:"string",
      lastCvDetails:"string",
      lastjobDescription:"string"
    },
    primaryKey: "_id",
  };
}

export const createdb = async ()=>{
  const realm = await Realm.open({
    schema: [CustomerSchema],
  });

  return realm
}

export default CustomerSchema