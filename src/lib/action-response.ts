export type ActionError = {
  ok: false
  message: string
  status?: "error"
}

export function actionError(message = "Something went wrong. Please try again."): ActionError {
  return {
    ok: false,
    status: "error",
    message
  }
}

export function isActionError(value: unknown): value is ActionError {
  return (
    typeof value === "object" &&
    value !== null &&
    "ok" in value &&
    (value as { ok?: unknown }).ok === false
  )
}
