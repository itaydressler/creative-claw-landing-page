import React from "react";
import { Composition } from "remotion";
import { ProductVideoDemo } from "./ProductVideoDemo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ProductVideoDemo"
        component={ProductVideoDemo}
        durationInFrames={320}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
