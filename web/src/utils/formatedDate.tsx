import { formatDistanceToNow, parseISO } from "date-fns";

const FormattedDate = ({
  createdAt,
  className,
}: {
  createdAt: string;
  className?: string;
}) => {
  const timeAgo = formatDistanceToNow(parseISO(createdAt), { addSuffix: true });

  return <span className={className}>{timeAgo}</span>;
};

export default FormattedDate;
