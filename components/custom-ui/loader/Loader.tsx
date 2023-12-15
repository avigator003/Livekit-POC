import { Spinner } from "@nextui-org/react";
import React from "react";

interface LoaderProps {
  isLabled?: boolean;
  label?: string;
}
function Loader(props: LoaderProps) {
  const { label, isLabled = true } = props;
  return (
    <div className="max-w-3xl flex-col rounded-xl bg-black">
      <Spinner
        color="success"
        size="lg"
        classNames={{
          wrapper: "h-28 w-28 left-8",
        }}
      />
      {isLabled && <p className="mt-10 text-2xl text-faceBlue">{label}</p>}
    </div>
  );
}

export default Loader;
