import { ChipProps } from "./types";

export const Chip = ({ tag }: ChipProps) => {
  return <div className="chip">{tag}</div>;
};
