import { IDLE, LOADING, SUCCESS, ERROR } from "./statuses";

export default function Loader({
  idleView = null,
  loadingView = null,
  errorView = null,
  status,
  successView,
  children,
}) {
  switch (status) {
    case IDLE:
      return idleView;
    case LOADING:
      return loadingView;
    case ERROR:
      return errorView;
    case SUCCESS:
      if (successView !== undefined && children !== undefined)
        throw new Error(
          "Only one of the following properties can be defined at the same time: 'successView' or 'children'."
        );
      if (successView !== undefined) {
        return successView;
      }
      if (children !== undefined) {
        return children;
      }
      return null;
    default:
      throw new Error(
        "The status property must be one of the following string values: 'idle', 'loading', 'success' or 'error'."
      );
  }
}
