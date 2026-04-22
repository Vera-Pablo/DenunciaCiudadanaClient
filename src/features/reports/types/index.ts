export interface ReportType {
  id_type: number;
  type: string;
}

export interface CreateReportData {
  description: string;
  street: string;
  street_number?: number;
  img_url: string;
  id_type: number;
}

export interface JSendResponse<T> {
  status: string;
  data: T;
  message?: string;
}
