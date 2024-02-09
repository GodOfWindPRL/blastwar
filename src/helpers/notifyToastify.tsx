import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

type TType = "success" | "error" | "info" | "warning" | "update" | "init";


//toast initital
const ToastContent = ({ message }: { message: string }) => {
  const { t } = useTranslation();
  return <>{t(message)}</>;
};
export const notifyToastify = (
  type: TType = "info",
  message: string,
  duration = 5000,
  className = ""
) => {
  switch (type) {
    case "success": {
      toast.success(<ToastContent message={message} />, {
        position: "top-right",
        autoClose: duration,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        className,
      });
      break;
    }
    case "error": {
      toast.error(<ToastContent message={message} />, {
        position: "top-right",
        autoClose: duration,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        className,
      });
      break;
    }
    case "warning": {
      toast.warning(<ToastContent message={message} />, {
        position: "top-right",
        autoClose: duration,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        className,
      });
      break;
    }

    default: {
      toast.info(<ToastContent message={message} />, {
        position: "top-right",
        autoClose: duration,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className,
      });
      break;
    }
  }
  return null;
};
