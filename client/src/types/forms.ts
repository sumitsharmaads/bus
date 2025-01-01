export type ContactFormStateType = {
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  message?: string;
};

export type ContactFormTouchedState = {
  firstname: boolean;
  lastname: boolean;
  email: boolean;
  phone: boolean;
  message: boolean;
};

export type LocalServiceType = {
  source: string;
  purpose: string;
  travelDate: string;
};

export type OutStationServiceType = LocalServiceType & {
  destination: string;
  tour: "one way" | "round trip";
  returnDate?: string;
};
