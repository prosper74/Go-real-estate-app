export interface Image {
  indexOf: any;
  map(arg0: (image: any) => JSX.Element): import("react").ReactNode;
  url: string;
  id?: string;
  length: number;
  0: {
    url: string;
  };
}

export interface Category {
  ID: number;
  Title: string;
  CreatedAt: string;
  UpdatedAt: string;
}

export interface SingleProperty {
  slice(arg0: number, arg1: number): import("react").SetStateAction<never[]>;
  sort: any;
  length: number | undefined;
  filter: any;
  map: any;
  ID: number;
  Title: string;
  Description: string;
  Price: number;
  Type: string;
  Duration: string;
  Size: string;
  City: string;
  State: string;
  Bedroom: number;
  Bathroom: number;
  Featured: number;
  Status: string;
  Images: Image[];
  CategoryID: number;
  UserID: number;
  Category: Category;
  User: UserProps;
  CreatedAt: string;
  UpdatedAt: string;
  properties?: SingleProperty;
}

export interface SortOptionProps {
  label: string;
  active: boolean;
  function: any;
}

export interface UserProps {
  ID: number;
  FirstName: string;
  LastName: string;
  Email: string;
  Password: string;
  Phone: string;
  AccessLevel: number;
  Verified: number;
  Address: string;
  Image: string;
  CreatedAt: string;
  UpdatedAt: string;
}

export interface StateUserProps {
  userId: number;
  jwt: string;
  onboarding: boolean;
}

export interface IImageUpload {
  files: File[];
  onDrop: (acceptedFiles: File[]) => void;
  public_id: string;
  acceptedFile: File[];
}

export interface ISearchWidget {
  properties: SingleProperty[];
  width: string;
  height: string;
  fill: string;
  placeholder: string;
}

export interface TemplateData {
  StringMap: string[];
  IntMap: number[];
  FloatMap: number[];
  Data: any;
  CSRFToken: string;
  Flash: string;
  Warning: string;
  Error: string;
  Form: any;
  IsAuthenticated: number;
}
