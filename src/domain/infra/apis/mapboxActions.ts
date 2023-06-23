import { axiosGet } from "../axios/axiosActions";

const baseUrl = "https://api.mapbox.com/matching/v5/mapbox";
const access_token = import.meta.env.VITE_MAPBOX_TOKEN as string;

export async function mapboxGet(
  url: string,
  params: Record<string, any> = {},
  title: string = "MapBox"
) {
  params.access_token = access_token;

  const response = await axiosGet(`${baseUrl}${url}`, params, title);
  return response;
}
