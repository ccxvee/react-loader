import { IDLE, LOADING, SUCCESS, ERROR } from "./statuses";

export default function Loader({
  status,
  idleView = null,
  loadingView = null,
  successView = null,
  errorView = null,
  children = null,
}) {
  switch (status) {
    case IDLE:
      return idleView;
    case LOADING:
      return loadingView;
    case ERROR:
      return errorView;
    case SUCCESS:
      if (successView && children)
        throw new Error(
          "Only one of the following properties can be defined at the same time: 'successView' or 'children'."
        );
      if (successView) {
        return successView;
      }
      return children;
    default:
      throw new Error(
        "The status property must be one of the following string values: 'idle', 'loading', 'success' or 'error'."
      );
  }
}
