import { useMutation } from "@tanstack/react-query";
import api from "../../../api/axios";
import { uploadService } from "../../../services/upload.service";
import type { CreateReportData, JSendResponse } from "../types";
import type { CreateReportForm } from "../schemas/report.schema";

export const useCreateReport = () => {
  return useMutation({
    mutationFn: async (formData: CreateReportForm) => {
      // Step 1: Upload image to Cloudinary
      const imageUrl = await uploadService.uploadImage(formData.image[0]);

      // Step 2: Create report in backend
      const reportData: CreateReportData = {
        description: formData.description,
        street: formData.street,
        street_number: formData.street_number,
        id_type: formData.id_type,
        img_url: imageUrl,
      };

      const response = await api.post<JSendResponse<{ tracking_num: string }>>("/reports", reportData);
      return response.data.data;
    },
  });
};
