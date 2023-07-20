export interface SingleResponse<T> {
  data: T;
  support: {
    url: string;
    text: string;
  };
}
