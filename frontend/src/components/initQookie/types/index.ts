export interface FaceOption {
  id: number;
  image: string;
}

export interface FaceOptions {
  eyes: FaceOption[];
  mouths: FaceOption[];
}

export interface QookieFaceOptionResponse {
  msg: string;
  payload: FaceOptions;
}
