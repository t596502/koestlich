import { Vector2, Vector3, Vector4 } from "three";
import { saveDivide } from "./utils.js";
import { Vector1, VectorX } from "./vector.js";

export type Transition = (from: VectorX, to: VectorX, delta: number) => void;

const zero = new Vector3(0, 0, 0);
const one = new Vector3(1, 1, 1);

export type Transformation = Readonly<{ translate: Vector3; scale: Vector3 }>;

const defaultTransformation: Transformation = { translate: zero, scale: one };

export function applyTransitionOnTransformation(
  transition: Transition,
  global: Transformation,
  local: Transformation,
  { translate: globalTargetTranslate, scale: globalTargetScale }: Transformation,
  { translate: localTargetTranslate, scale: localTargetScale }: Transformation,
  parentCurrent: Transformation = defaultTransformation,
  deltaTime: number,
): void {
  const { translate: globalTranslate, scale: globalScale } = global;
  const { translate: localTranslate, scale: localScale } = local;

  const globalDistanceToLocalTarget = localTranslate.distanceTo(localTargetTranslate);
  const globalDistanceToGlobalTarget = globalTranslate.distanceTo(globalTargetTranslate);

  if (globalDistanceToGlobalTarget < globalDistanceToLocalTarget) {
    transition(globalTranslate, globalTargetTranslate, deltaTime);
    transition(globalScale, globalTargetScale, deltaTime);

    localFromGlobalTransformation(local, global, parentCurrent);
  } else {
    transition(localTranslate, localTargetTranslate, deltaTime);
    transition(localScale, localTargetScale, deltaTime);

    globalFromLocalTransformation(global, local, parentCurrent);
  }
}

const helper = new Vector3();
export function getParentScale(size: Vector3): Vector3 {
  helper.copy(size);
  helper.z = 1;
  return helper;
}

export function localFromGlobalTransformation(
  { translate: localTranslate, scale: localScale }: Transformation,
  { translate: globalTranslate, scale: globalScale }: Transformation,
  parentCurrent: Transformation = defaultTransformation,
): void {
  const parentScale = getParentScale(parentCurrent.scale);
  localFromGlobalTranslate(localTranslate, globalTranslate, parentCurrent.translate, parentScale);
  localFromGlobalScale(localScale, globalScale, parentScale);
}

export function localFromGlobalTranslate(
  local: Vector3,
  global: Vector3,
  parent: Vector3 = zero,
  parentScale: Vector3,
): Vector3 {
  return saveDivide(local.copy(global).sub(parent), parentScale);
}

export function localFromGlobalScale(local: Vector3, global: Vector3, parent: Vector3): Vector3 {
  return saveDivide(local.copy(global), parent);
}

export function globalFromLocalTransformation(
  { translate: globalTranslate, scale: globalScale }: Transformation,
  { translate: localTranslate, scale: localScale }: Transformation,
  parentCurrent: Transformation = defaultTransformation,
): void {
  const parentScale = getParentScale(parentCurrent.scale);
  globalFromLocalTranslate(globalTranslate, localTranslate, parentCurrent.translate, parentScale);
  globalFromLocalScale(globalScale, localScale, parentScale);
}

export function globalFromLocalTranslate(
  global: Vector3,
  local: Vector3,
  parent: Vector3 = zero,
  parentScale: Vector3,
): Vector3 {
  return global.copy(local).multiply(parentScale).add(parent);
}

export function globalFromLocalScale(global: Vector3, local: Vector3, parent: Vector3): Vector3 {
  return global.copy(local).multiply(parent);
}
// eslint-disable-next-line @typescript-eslint/ban-types
const helperMap = new Map<Function, VectorX>();

function getHelperClone(forVec: VectorX): VectorX {
  let fromCopy = helperMap.get(forVec.constructor);
  if (fromCopy == null) {
    fromCopy = forVec.clone();
    helperMap.set(forVec.constructor, fromCopy);
  } else {
    fromCopy.copy(forVec);
  }
  return fromCopy;
}

export function noTransition(from: VectorX, to: VectorX): void {
  from.copy(to);
}

export function linearTransition(speed = 5): (from: VectorX, to: VectorX, delta: number) => void {
  return (from, to, delta) => {
    const fromCopy = getHelperClone(from);
    const distance = from.copy(to).sub(fromCopy).length();
    if (distance <= 0.0001) {
      from.copy(to);
      return;
    }
    from.multiplyScalar(Math.min(1, (speed * delta) / distance)).add(fromCopy);
  };
}

export function distanceTransition(speed = 5): (from: VectorX, to: VectorX, delta: number) => void {
  return (from, to, delta) => {
    const fromCopy = getHelperClone(from);
    from
      .copy(to)
      .sub(fromCopy)
      .multiplyScalar(Math.min(1, delta * speed)) //min prevents overshooting
      .add(fromCopy);
  };
}
