import {deleteAsync} from "del";
import { PATH } from "../config/path.js";

export async function reset() {
  return await deleteAsync(PATH.clean);
}
