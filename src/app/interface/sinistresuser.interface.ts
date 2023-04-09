export interface sinistreUserInterface {
  id: number;
  user_id: number;
  description: string;
  date_time: string;
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
