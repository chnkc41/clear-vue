import { uuid } from "vue-uuid";

export const customerInitialObject = {
  id: uuid.v1(),
  name: "",
  email: "",
  vatNumber: "",
  sites: [
    {
      id: uuid.v1(),
      name: "",
      address: "",
      postCode: "",
      coordinates: {
        latitude: "",
        longitude: "",
      },
      meters: [
        {
          id: uuid.v1(),
          name: "",
          serialNumber: "",
          installationDate: "",
          circuits: [],
        },
      ],
    },
  ],
};

export const siteInitialObject = {
  id: uuid.v1(),
  name: "",
  address: "",
  postCode: "",
  coordinates: {
    latitude: "",
    longitude: "",
  },
  meters: [
    {
      id: uuid.v1(),
      name: "",
      serialNumber: "",
      installationDate: "",
      circuits: [],
    },
  ],
};

export const meterInitialObject = {
  id: uuid.v1(),
  name: "",
  serialNumber: "",
  installationDate: "",
  circuits: [],
};
