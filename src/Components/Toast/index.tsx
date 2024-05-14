type ToastProps = {
  status: string;
  title: string;
};

type classesType = {
  [key: string]: string;
};

export const Toast = ({ status, title }: ToastProps) => {
  const classes: classesType = {
    error: "bg-[#C53030]",
    success: "bg-[#2F855A]",
    info: "bg-[#2b6cb0]",
  };
  return (
    <div
      className={`${
        classes[status] || ""
      } fixed left-[50%] translate-x-[-50%] top-[20px] text-white max-w-[300px] shadow-xl p-[20px] z-50 rounded-lg`}
    >
      {title}
    </div>
  );
};
