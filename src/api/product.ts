import axios from "axios";
import { API_ENDPOINT } from "src/utils/constant/api";

export const apiGetProductDetail = async (id: any) => {
  const res = await axios
    .get(`${API_ENDPOINT}/products/${id}`)
    .then((res) => res.data);
  console.log(res.data);
  return res;
};
