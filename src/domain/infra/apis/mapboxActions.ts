import { axiosGet } from "../axios/axiosActions";

const baseUrl = "https://api.mapbox.com/matching/v5/mapbox";

export function mapboxGetPublicToken() {
  return import.meta.env.VITE_MAPBOX_TOKEN;
}

export async function mapboxGet(
  url: string,
  params: Record<string, any> = {},
  title: string = "MapBox"
) {
  const response = await axiosGet(`${baseUrl}${url}`, params, title);
  return response;
}
