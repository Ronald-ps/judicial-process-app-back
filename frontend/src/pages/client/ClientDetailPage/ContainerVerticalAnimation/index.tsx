import { forwardRef } from "react";

interface ContainerVerticalAnimationProps {
  inView: boolean;
  animationTime?: number;
  children: React.ReactNode;
}
export const ContainerVerticalAnimationComponent = (
  props: ContainerVerticalAnimationProps,
  ref: React.Ref<HTMLDivElement> /* essa ref serve pra fazer verificações se o componente está em visualização */
) => {
  return (
    <div
      className="ContainerVerticalAnimation"
      style={{
        transform: props.inView ? "none" : "translateY(-1px)",
        opacity: props.inView ? 1 : 0,
        transition: `all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) ${
          props.animationTime || "0.06"
        }s`,
      }}
      ref={ref}
    >
      {props.children}
    </div>
  );
};

export const ContainerVerticalAnimation = forwardRef(
  ContainerVerticalAnimationComponent
);
