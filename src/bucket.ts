import { Group, InstancedMesh } from "three";

export class Bucket extends Group {
  /*addInstancedMesh(): Control {
        //finds a bucket to put this in
    }

    removeInstancedMesh(control: Control): void {

    }*/
}

export type ControlledInstancedMesh = InstancedMesh & {
  add(): void;
  update(): void;
  remove(): void;
};
