import { LazyExoticComponent, lazy } from "react";
import { BaseSchema } from "..";

import base1Img from "../imgs/templateImg/base.jpg";
import base2Img from "../imgs/templateImg/base.jpg";

import { schemas as baseSchenmas } from "./base";
import { schemas as base2Schenmas } from "./base-2";

export interface TemplateInfo {
  name: string;
  Comp: LazyExoticComponent<any>;
  preview: string;
  schemas?: {
    placeholderSchemas: BaseSchema<any>;
    optionSchemas: BaseSchema<any>;
  };
}

export const templates: {
  [key: string]: TemplateInfo;
} = {
  base: {
    name: "基础",
    Comp: lazy(() => import("./base")),
    preview: base1Img,
    schemas: baseSchenmas,
  },
  base2: {
    name: "基础2",
    Comp: lazy(() => import("./base-2")),
    preview: base2Img,
    schemas: base2Schenmas,
  },
};
