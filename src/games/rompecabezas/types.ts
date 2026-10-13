export type PieceId = 'hair' | 'head' | 'torso' | 'leftArm' | 'rightArm' | 'leftLeg' | 'rightLeg';

export interface PieceInfo {
  id: PieceId;
  name: string;
}
