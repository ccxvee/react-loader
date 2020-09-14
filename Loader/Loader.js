import { IDLE, LOADING, SUCCESS, ERROR } from "./statuses";

export default function Loader({
  status,
  idleView = null,
  loadingView = null,
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
      return children;
    default:
      throw new Error(
        "The status property must be one of the following string values: 'idle', 'loading', 'success' or 'error'."
      );
  }
}
