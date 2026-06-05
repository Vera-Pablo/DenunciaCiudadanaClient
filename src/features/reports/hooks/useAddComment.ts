import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api/axios";
import { useAuth } from "../../auth";
import type { Comment, JSendResponse, Report } from "../types";

export const useAddComment = (reportId: number) => {
    const queryClient = useQueryClient();
    const { user } = useAuth();

    return useMutation({
        mutationFn: async (text: string) => {
            const response = await api.post<JSendResponse<Comment>>(
                `/reports/${reportId}/comments`,
                { text }
            );
            return response.data.data;
        },
        onMutate: async (text: string) => {
            await queryClient.cancelQueries({ queryKey: ["myReports"] });
            await queryClient.cancelQueries({ queryKey: ["adminReports"] });

            const previousMyReports = queryClient.getQueryData<Report[]>(["myReports"]);
            const previousAdminReports = queryClient.getQueriesData<Report[]>({ queryKey: ["adminReports"] });

            const optimisticComment: Comment = {
                id_comment: -Date.now(), 
                text,
                date: new Date().toISOString(),
                id_user: user?.id_user ?? 0,
                user: {
                    name: user?.name ?? "",
                    role: {
                        type_role: user?.role?.type_role ?? "Ciudadano",
                    },
                },
            };

            const injectComment = (reports: Report[] | undefined) => {
                if (!reports) return reports;
                return reports.map((r) =>
                    r.id_report === reportId
                        ? { ...r, comments: [optimisticComment, ...(r.comments || [])] }
                        : r
                );
            };

            queryClient.setQueryData<Report[]>(["myReports"], injectComment);
            queryClient.setQueriesData<Report[]>({ queryKey: ["adminReports"] }, injectComment);

            return { previousMyReports, previousAdminReports };
        },
        onError: (_err, _text, context) => {
            if (context?.previousMyReports) {
                queryClient.setQueryData(["myReports"], context.previousMyReports);
            }
            if (context?.previousAdminReports) {
                context.previousAdminReports.forEach(([key, data]) => {
                    queryClient.setQueryData(key, data);
                });
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["myReports"] });
            queryClient.invalidateQueries({ queryKey: ["adminReports"] });
        },
    });
};