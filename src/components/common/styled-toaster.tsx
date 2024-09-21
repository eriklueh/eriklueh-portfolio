import React from "react";
import { Toaster } from "sonner";
import {
  Check,
  CircleX,
  InfoIcon,
  LoaderCircle,
  TriangleAlert,
} from "lucide-react";

const StyledToaster: React.FC = () => {
  return (
    <Toaster
      icons={{
        success: <Check />,
        info: <InfoIcon />,
        warning: <TriangleAlert />,
        error: <CircleX />,
        loading: <LoaderCircle />,
      }}
      toastOptions={{
        classNames: {
          toast: "bg-background text-foreground border-background",
          title: " font-bold",
          description: "text-muted-foreground",
          error: "border-error text-error",
          success: "border-success text-success",
          warning: "border-warning text-warning",
          info: "border-info text-info",

        },
      }}
    />
  );
};

export default StyledToaster;
