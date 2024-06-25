export const getSkip = ({ page, perPage }: { page: number; perPage: number }) =>
  perPage * (page - 1);

export const getTotalPages = ({
  perPage,
  totalCount,
}: {
  totalCount: number;
  perPage: number;
}) => Math.ceil(totalCount / perPage);
