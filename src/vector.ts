export type VectorX = {
  copy(v: VectorX): VectorX;
  length(): number;
  add(vec: VectorX): VectorX;
  sub(vec: VectorX): VectorX;
  multiply(vec: VectorX): VectorX;
  multiplyScalar(scalar: number): VectorX;
  clone(): VectorX;
};

export class Vector1 implements VectorX {
  constructor(public x: number = 0) {}

  length(): number {
    return Math.abs(this.x);
  }

  set(x: number): void {
    this.x = x;
  }

  multiplyScalar(scalar: number): Vector1 {
    this.x *= scalar;
    return this;
  }

  divideScalar(scalar: number): Vector1 {
    this.x /= scalar;
    return this;
  }

  add(vec: Vector1): Vector1 {
    this.x += vec.x;
    return this;
  }

  sub(vec: Vector1): Vector1 {
    this.x -= vec.x;
    return this;
  }

  divide(vec: Vector1): Vector1 {
    this.x /= vec.x;
    return this;
  }

  multiply(vec: Vector1): Vector1 {
    this.x *= vec.x;
    return this;
  }

  copy(vec: Vector1): Vector1 {
    this.x = vec.x;
    return this;
  }

  clone(): Vector1 {
    return new Vector1(this.x);
  }
}
