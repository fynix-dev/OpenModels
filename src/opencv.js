import cvReadyPromise from "@techstark/opencv-js";

export async function getOpenCv() {
  const cv = await cvReadyPromise;
  window.cv = cv;
  return cv;
}