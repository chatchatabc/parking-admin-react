import { Button, ButtonProps } from "antd";

function MyButton({ ...props }: ButtonProps) {
  return (
    <Button
      {...props}
      className={`py-1 px-4 rounded-md bg-bg3 text-t1 border-none ${props.className}`}
    >
      {props.children}
    </Button>
  );
}

export default MyButton;
