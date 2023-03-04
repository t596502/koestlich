import { buildComponent } from "../component.js";
import { PropertyAPI, useBox } from "../index.js";
import { buildRoot } from "../root.js";
import { ContainerNode, useContainer } from "./container.js";
import { ImageNode, useImage } from "./image.js";
import { Object3DNode, useSVG, useGLTF, useObject } from "./object-3d.js";
import { TextNode, useText } from "./text.js";

export function buildComponents<A extends PropertyAPI>(api: A) {
  return {
    Box: buildComponent(Object3DNode, useBox, api),
    RootBox: buildRoot(Object3DNode, useBox, api),
    Container: buildComponent(ContainerNode, useContainer, api),
    RootContainer: buildRoot(ContainerNode, useContainer, api),
    Text: buildComponent(TextNode, useText, api),
    RootText: buildRoot(TextNode, useText, api),
    SVG: buildComponent(Object3DNode, useSVG, api),
    RootSVG: buildRoot(Object3DNode, useSVG, api),
    Object: buildComponent(Object3DNode, useObject, api),
    RootObject: buildRoot(Object3DNode, useObject, api),
    GLTF: buildComponent(Object3DNode, useGLTF, api),
    RootGLTF: buildRoot(Object3DNode, useGLTF, api),
    Image: buildComponent(ImageNode, useImage, api),
    RootImage: buildRoot(ImageNode, useImage, api),
  };
}

export * from "./container.js";
export * from "./image.js";
export * from "./text.js";
export * from "./object-3d.js";
