import { IoWarningOutline } from "react-icons/io5";
import { FaRocket } from "react-icons/fa";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

interface AlertPorps {
  type: string;
  message: string;
}
export function CodeCLAlert({type, message}: AlertPorps) {
  switch (type) {
    case 'error':
      return (
        <Alert variant="destructive" className="bg-red-200">
          <IoWarningOutline className="text-red h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {message}
          </AlertDescription>
        </Alert>
      )
    case 'warning':
      return (
        <Alert variant="default" className="bg-yellow-200">
          <IoWarningOutline className=" h-4 w-4" />
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>
            {message}
          </AlertDescription>
        </Alert>
      )
    case 'success':
      return (
        <Alert variant="default" className="bg-green-100 max-w-xl">
          <FaRocket className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>
            {message}
          </AlertDescription>
        </Alert>
      )
  
    default:
      return <></>
  }
}
