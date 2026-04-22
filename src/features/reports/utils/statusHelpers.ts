import { type BadgeVariant } from "../../../components/ui/Badge";

export const getStatusVariant = (statusName: string): BadgeVariant => {
  switch (statusName.toLowerCase()) {
    case "pendiente":
      return "pending";
    case "finalizado":
      return "success";
    case "atendido":
      return "warning";
    case "rechazado":
      return "error";
    default:
      return "neutral";
  }
};

export const getStatusLabel = (statusName: string): string => {
  if (statusName.toLowerCase() === "finalizado") return "Resuelta";
  return statusName;
};
