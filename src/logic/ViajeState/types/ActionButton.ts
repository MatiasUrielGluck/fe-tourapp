export type ActionFn = () => Promise<void>;

type ActionButton = {
  label: string;
  color: string;
  action: ActionFn;
};

export default ActionButton;
