import { useMutation } from "@tanstack/react-query";
import { authService } from "./auth.service";

export const useResetPassword = () => {
    return useMutation({
        mutationFn: (data: {token: string; newPassword: string}) => authService.resetPassword(data),
    });
};