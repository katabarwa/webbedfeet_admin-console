import { CSSProperties, FC, ReactNode, useEffect, useRef } from "react";

interface IClickOutsideHandlerProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClickedOutside: () => void;
}

const ClickedOutsideAnElementHandler: FC<IClickOutsideHandlerProps> = ({
  children,
  className = "",
  style = {},
  onClickedOutside,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // add event listener when element is mounted
    document.addEventListener("mousedown", handleClick);

    return () => {
      // remove event listener when element is unmounted
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleClick = (event: MouseEvent) => {
    if (ref.current?.contains(event.target as Element)) return; // inside click

    //outside click
    event.preventDefault();
    event.stopPropagation();
    onClickedOutside();
  };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
};

export default ClickedOutsideAnElementHandler;
