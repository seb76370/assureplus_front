export interface sinistre_UserInterface {
  id: number;
  first_name: string;
  last_name: string;
  street: string;
  zipcode: string;
  city: string;
  date_time: string;
  contract_number: string;
  sinistres: sinistreInterface[];
}

export interface sinistreInterface {
  id: number;
  user_id: number;
  description: string;
  cloture: boolean;
  date_time: Date;
  comments: commentInterface[];
  files: filesInterface[];
}

interface commentInterface {
  id: number;
  sinistre_id: number;
  comment: string;
  date_time: string;
}

interface filesInterface {
  id: number;
  sinistre_id: number;
  title: string;
  file: string;
  date_time: string;
}
