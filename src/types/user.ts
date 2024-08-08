export type TSignToken = (
  payload: Object,
  duration?: string
) => Promise<string | null>;
