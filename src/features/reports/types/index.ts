export interface ReportType {
  id_type: number;
  type: string;
}

export interface Status {
  id_status: number;
  type_status: string;
}

export interface Comment {
  id_comment: number;
  text: string;
  date: string;
  user: {
    name: string;
    role: {
      type_role: string;
    };
  };
}

export interface Report {
  id_report: number;
  tracking_num: string;
  description: string;
  img_url: string | null;
  date: string;
  id_type: number;
  id_status: number;
  id_user: number;
  street: string;
  street_number: number;
  type: ReportType;
  status: Status;
  user: {
    name: string;
    email: string;
  };
  comments?: Comment[];
}

export interface CreateReportData {
  description: string;
  street: string;
  street_number?: number;
  img_url: string | null;
  id_type: number;
}

export interface UpdateReportStatusData {
  id_status: number;
  resolution_text?: string;
}

export interface JSendResponse<T> {
  status: string;
  data: T;
  message?: string;
}
