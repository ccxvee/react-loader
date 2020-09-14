import React from "react";

function Loader({
  children = null,
  loadingStatus,
  idle = null,
  loading = null,
  success = null,
  error = null,
}) {
  if (!loadingStatus) {
    throw new Error("requires loadingStatus prop");
  }

  return children;
}

export { Loader };
