export const isEmpty: (value?: string | null) => boolean = (value) => {
  return value === undefined || value === null || value.length === 0;
};
