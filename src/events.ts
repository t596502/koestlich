import { Object3D } from "three";
import { BaseInstance, RootState } from "@react-three/fiber";
import { UseBoundStore, StoreApi } from "zustand";
import { EventHandlers } from "@react-three/fiber/dist/declarations/src/core/events.js";

export type R3FRoot = UseBoundStore<RootState, StoreApi<RootState>>;

export function applyEventHandlers(
  object: Object3D,
  handlers: Partial<EventHandlers>,
  root: R3FRoot,
): void {
  if ("__r3f" in object) {
    (object as unknown as BaseInstance).__r3f.handlers = handlers;
    return;
  }
  (object as any).__r3f = {
    root,
    eventCount: 1,
    handlers,
  };
}
