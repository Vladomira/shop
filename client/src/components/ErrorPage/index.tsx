import { useRouteError } from "react-router-dom";

type ErrorType = {
   data: string;
   error: { message: string; stack: string };
   internal: string;
   status: number;
   statusText: string;
};
export default function ErrorPage() {
   // const error = useRouteError() as ErrorType;
   // console.error(error);

   return (
      <div id="error-page">
         <h1>Oops!</h1>
         <p>Sorry, an unexpected error has occurred.</p>
         <p>{/* <i>{error.statusText || error.error.message}</i> */}</p>
      </div>
   );
}
