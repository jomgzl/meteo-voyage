import { IError } from "../types/error";

interface IProps extends IError {}

export default function Error({ errorMessage }: IProps) {
  return <div> {errorMessage}</div>;
}
