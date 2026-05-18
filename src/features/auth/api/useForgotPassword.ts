import {useMutation} from '@tanstack/react-query';
import { authService } from './auth.service';

export const useForgotPassword = () =>{
    return useMutation({
        mutationFn: (data: {email: string}) => authService.forgotPassword(data),
    });
};