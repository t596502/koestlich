import { alias, flexAPI, flag, PropertiesFromAPI, PropertyAPI } from "./index.js";
import { ContainerProperties } from "../components/index.js";

export const tailwindAPI = {
  ...flexAPI,

  //margin
  m: alias("marginBottom", "marginTop", "marginLeft", "marginRight"),
  mt: alias("marginTop"),
  ml: alias("marginLeft"),
  mr: alias("marginRight"),
  mb: alias("marginBottom"),
  mx: alias("marginLeft", "marginRight"),
  my: alias("marginTop", "marginBottom"),

  //padding
  p: alias("paddingBottom", "paddingTop", "paddingLeft", "paddingRight"),
  pt: alias("paddingTop"),
  pl: alias("paddingLeft"),
  pr: alias("paddingRight"),
  pb: alias("paddingBottom"),
  px: alias("paddingLeft", "paddingRight"),
  py: alias("paddingTop", "paddingBottom"),

  //border
  bOpacity: alias<ContainerProperties, "borderOpacity">("borderOpacity"),
  bColor: alias<ContainerProperties, "borderColor">("borderColor"),
  b: alias("borderBottom", "borderTop", "borderLeft", "borderRight"),
  bt: alias("borderTop"),
  bl: alias("borderLeft"),
  br: alias("borderRight"),
  bb: alias("borderBottom"),
  bx: alias("borderLeft", "borderRight"),
  by: alias("borderTop", "borderBottom"),

  r: alias<
    ContainerProperties,
    | "borderRadiusTopLeft"
    | "borderRadiusTopRight"
    | "borderRadiusBottomRight"
    | "borderRadiusBottomLeft"
  >(
    "borderRadiusBottomLeft",
    "borderRadiusBottomRight",
    "borderRadiusTopLeft",
    "borderRadiusTopRight",
  ),
  rL: alias<ContainerProperties, "borderRadiusTopLeft" | "borderRadiusBottomLeft">(
    "borderRadiusTopLeft",
    "borderRadiusBottomLeft",
  ),
  rR: alias<ContainerProperties, "borderRadiusTopRight" | "borderRadiusBottomRight">(
    "borderRadiusTopRight",
    "borderRadiusBottomRight",
  ),
  rT: alias<ContainerProperties, "borderRadiusTopLeft" | "borderRadiusTopRight">(
    "borderRadiusTopLeft",
    "borderRadiusTopRight",
  ),
  rB: alias<ContainerProperties, "borderRadiusBottomLeft" | "borderRadiusBottomRight">(
    "borderRadiusBottomLeft",
    "borderRadiusBottomRight",
  ),
  rTL: alias<ContainerProperties, "borderRadiusTopLeft">("borderRadiusTopLeft"),
  rTR: alias<ContainerProperties, "borderRadiusTopRight">("borderRadiusTopRight"),
  rBL: alias<ContainerProperties, "borderRadiusBottomLeft">("borderRadiusBottomLeft"),
  rBR: alias<ContainerProperties, "borderRadiusBottomRight">("borderRadiusBottomRight"),

  //size
  w: alias("width"),
  h: alias("height"),
  maxW: alias("maxWidth"),
  maxH: alias("maxHeight"),
  minW: alias("minWidth"),
  minH: alias("minHeight"),

  //position
  top: alias("positionTop"),
  bottom: alias("positionBottom"),
  left: alias("positionLeft"),
  right: alias("positionRight"),

  //flex
  direction: alias("flexDirection"),
  items: alias("alignItems"),
  content: alias("alignContent"),
  self: alias("alignSelf"),
  justify: alias("justifyContent"),
  grow: alias("flexGrow"),
  shrink: alias("flexShrink"),
  basis: alias("flexBasis"),
  wrap: alias("flexWrap"),

  //color
  bgColor: alias<ContainerProperties, "backgroundColor">("backgroundColor"),
  bgOpacity: alias<ContainerProperties, "backgroundOpacity">("backgroundOpacity"),

  //flags
  absolute: flag("position", "absolute" as const),
  relative: flag("position", "relative" as const),
  bgTransparent: flag("backgroundOpacity", 0),

  //transformation
  x: alias<ContainerProperties, "translateX">("translateX"),
  y: alias<ContainerProperties, "translateY">("translateY"),
  z: alias<ContainerProperties, "translateZ">("translateZ"),
  sX: alias<ContainerProperties, "scaleX">("scaleX"),
  sY: alias<ContainerProperties, "scaleY">("scaleY"),
  sZ: alias<ContainerProperties, "scaleZ">("scaleZ"),
} satisfies PropertyAPI;
