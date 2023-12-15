import {
  Radio,
  RadioGroup,
  RadioProps,
  VisuallyHidden,
  cn,
  useRadio,
} from "@nextui-org/react";
import React from "react";

export const RadioInput = (props: RadioProps) => {
  // const {
  //   Component,
  //   children,
  //   isSelected,
  //   description,
  //   getBaseProps,
  //   getWrapperProps,
  //   getInputProps,
  //   getLabelProps,
  //   getLabelWrapperProps,
  //   getControlProps,
  // } = useRadio(props);
  const { children, ...otherProps } = props;

  return (
    // <Component
    //   {...getBaseProps()}
    //   className={cn(
    //     "group inline-flex flex-row items-center",
    //     "w-full cursor-pointer gap-4 rounded-lg border-2 border-borderColor p-3",
    //     "data-[selected=true]:border-faceBlue",
    //   )}
    // >
    //   <VisuallyHidden>
    //     <input {...getInputProps()} />
    //   </VisuallyHidden>
    //   <span {...getWrapperProps()}>
    //     <span {...getControlProps()} />
    //   </span>
    //   <div {...getLabelWrapperProps()}>
    //     {children && <span {...getLabelProps()}>{children}</span>}
    //     {description && (
    //       <span className="text-small text-foreground opacity-70">
    //         {description}
    //       </span>
    //     )}
    //   </div>
    // </Component>
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          "inline-flex m-0 items-center max-w-none",
          "flex flex-row w-full cursor-pointer rounded-lg gap-4 p-3 border border-textGrey dark:border-borderColor",
          "data-[selected=true]:border-faceBlue data-[focus-visible=true]:border-faceBlue",
        ),
        wrapper:
          "flex flex-row relative inline-flex items-center justify-center flex-shrink-0 overflow-hidden rounded-full group-data-[hover-unselected=true]:bg-transparent group-data-[focus-visible=true]:z-10 group-data-[focus-visible=true]:ring-2 group-data-[focus-visible=true]:ring-focus group-data-[focus-visible=true]:ring-offset-2 group-data-[focus-visible=true]:ring-offset-background  w-4 h-4 group-data-[pressed=true]:scale-95 transition-transform-colors motion-reduce:transition-none group-data-[selected=true]:outline-none group-data-[selected!=true]:!border-textGrey dark:group-data-[unselected=true]:!border-borderColor group-data-[selected=true]:border-faceBlue",
        control:
          "z-10 opacity-0 scale-0 origin-center rounded-full group-data-[selected=true]:opacity-100 group-data-[selected=true]:scale-100 bg-faceBlue text-foreground w-2 h-2 transition-transform-opacity motion-reduce:transition-none",
        label: "text-textGrey max-w-none",
      }}
    >
      {children}
    </Radio>
  );
};
