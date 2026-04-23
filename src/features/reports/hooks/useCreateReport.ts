import { useMutation } from "@tanstack/react-query";
import api from "../../../api/axios";
import { uploadService } from "../api/upload.service";
import type { CreateReportData, JSendResponse } from "../types";
import type { CreateReportForm } from "../schemas/report.schema";

export const useCreateReport = () => {
  return useMutation({
    mutationFn: async (formData: CreateReportForm) => {
      let imageUrl: string | null = null;

      if (formData.image && formData.image.length > 0) {
        imageUrl = await uploadService.uploadImage(formData.image[0]);
      }

      const reportData: CreateReportData = {
        description: formData.description,
        street: formData.street,
        street_number: formData.street_number,
        id_type: formData.id_type,
        img_url: imageUrl,
      };

      const response = await api.post<JSendResponse<{ tracking_num: string }>>(
        "/reports",
        reportData,
      );
      return response.data.data;
    },
  });
};
