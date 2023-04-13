export interface unsuiviInterface {
  id:number
  description: string;
  date_time: Date;
  files: string[];
  comments: commentSuivi[];
}

export interface commentSuivi{
  comment:string,
  date_time:Date
}
