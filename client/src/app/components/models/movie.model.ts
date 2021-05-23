export interface Movie {
  _id: number;
  title: string;
  file: string;
  direction: string;
  year: string;
  country: string;
  duration: string;
  cast: {
    name1: string;
    name2: string;
  };
}
