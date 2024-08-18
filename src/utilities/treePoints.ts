class Matrix extends DOMMatrix {}
class Point extends DOMPoint {}

type TreeInput = { level?: number; maxLevel: number; parent?: Tree; matrix?: Matrix };

const unit = 20;

export class Tree {
  branches: Tree[] | null = null;
  level: number;
  basePoint: Point = new Point(0, unit);
  parent: Tree | null;
  matrix: Matrix; // Base to Final Point

  constructor({ level = 0, maxLevel = 0, parent, matrix }: TreeInput) {
    this.level = level;
    this.parent = parent ?? null;
    this.matrix = matrix ?? new Matrix();
    if (this.level >= maxLevel) return;
    const childMatrices = Array.from({ length: 2 }, (_, i) => {
      const matrix = new Matrix();
      return matrix
        .translate(0, unit)
        .rotate(0, 0, (-1) ** i * (30 + 20 * Math.random()))
        .scale(0.9, 0.9);
    });

    this.branches = childMatrices.map(
      (matrix) => new Tree({ level: level + 1, maxLevel, parent: this, matrix }),
    );
  }
  setChildPoint(baseTransform: Matrix) {
    if (!this.branches) return;
    for (const branch of this.branches) {
      const resultantMatrix = baseTransform.multiply(this.matrix);
      branch.basePoint = new Point(0, 0).matrixTransform(resultantMatrix);
      branch.setChildPoint(resultantMatrix);
    }
  }
}

const tree = new Tree({ maxLevel: 6 });
tree.setChildPoint(new Matrix());
export { tree };
