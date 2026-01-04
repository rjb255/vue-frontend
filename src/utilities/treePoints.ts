class Matrix extends DOMMatrix {}
class Point extends DOMPoint {}

type TreeInput = { level?: number; maxLevel: number; parent?: Tree; left?: boolean };

const unit = 30;

export class Tree {
  branches: Tree[] | null = null;
  level: number;
  // Final point relavtive to base point
  parent: Tree | null;
  matrix: Matrix; // Base to Final Point

  constructor({ level = 0, maxLevel = 0, parent, left }: TreeInput) {
    this.level = level;
    this.parent = parent ?? null;
    this.matrix = new Matrix();
    if (this.parent) {
      const direction = left ? 1 : -1;
      this.matrix
        .translateSelf(0, unit)
        .rotateSelf(0, 0, direction * (30 + 20 * Math.random()))
        .scaleSelf(0.8, 0.8);
      console.log(this.matrix.isIdentity);
      this.matrix.preMultiplySelf(this.parent.matrix);
    }
    if (this.level >= maxLevel) return;
    this.branches = [
      new Tree({ level: level + 1, maxLevel, parent: this, left: true }),
      new Tree({ level: level + 1, maxLevel, parent: this, left: false }),
    ];

    // this.branches = childMatrices.map(
    //   (matrix) => new Tree({ level: level + 1, maxLevel, parent: this, matrix }),
    // );
  }

  get point() {
    return this.matrix.transformPoint(new Point(0, unit));
  }

  // setChildPoint(baseTransform: Matrix) {
  //   if (!this.branches) return;
  //   for (const branch of this.branches) {
  //     const resultantMatrix = baseTransform.multiply(this.matrix);
  //     branch.setChildPoint(resultantMatrix);
  //   }
  // }
}

const tree = new Tree({ maxLevel: 10 });
// tree.setChildPoint(new Matrix());

export { tree };
