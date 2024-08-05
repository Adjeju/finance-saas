import { ComponentProps } from "react";
import Creatable from "react-select/creatable";

type Props = ComponentProps<Creatable>;

export const CreatableSelect = (props: Props) => {
  return <Creatable {...props} />;
};
