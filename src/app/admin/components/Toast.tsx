import { toast } from "@/app/admin/components/ui/use-toast";

export function showErrorToast(message: string) {
    toast({
      title: "Error",
      description: message,
      variant: "destructive",
      duration: 5000,  // Longer duration
    });
  }
  
  export function showSuccessToast(message: string) {
    toast({
      title: "Success",
      description: message,
      variant: "default",
      duration: 5000,  // Longer duration
    });
  }