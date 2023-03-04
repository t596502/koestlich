import { ContainerProperties } from "../components/container.js";
import { alias, PropertyAPI } from "./index.js";

export const flexAPI = {
  inset: alias("positionTop", "positionLeft", "positionRight", "positionBottom"),

  borderRadius: alias<
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
  borderRadiusLeft: alias<ContainerProperties, "borderRadiusTopLeft" | "borderRadiusBottomLeft">(
    "borderRadiusTopLeft",
    "borderRadiusBottomLeft",
  ),
  borderRadiusRight: alias<ContainerProperties, "borderRadiusTopRight" | "borderRadiusBottomRight">(
    "borderRadiusTopRight",
    "borderRadiusBottomRight",
  ),
  borderRadiusTop: alias<ContainerProperties, "borderRadiusTopLeft" | "borderRadiusTopRight">(
    "borderRadiusTopLeft",
    "borderRadiusTopRight",
  ),
  borderRadiusBottom: alias<
    ContainerProperties,
    "borderRadiusBottomLeft" | "borderRadiusBottomRight"
  >("borderRadiusBottomLeft", "borderRadiusBottomRight"),
  border: alias("borderBottom", "borderTop", "borderLeft", "borderRight"),
  borderX: alias("borderLeft", "borderRight"),
  borderY: alias("borderTop", "borderBottom"),
  padding: alias("paddingBottom", "paddingTop", "paddingLeft", "paddingRight"),
  paddingX: alias("paddingLeft", "paddingRight"),
  paddingY: alias("paddingTop", "paddingBottom"),
  margin: alias("marginBottom", "marginTop", "marginLeft", "marginRight"),
  marginX: alias("marginLeft", "marginRight"),
  marginY: alias("marginTop", "marginBottom"),
} satisfies PropertyAPI;
