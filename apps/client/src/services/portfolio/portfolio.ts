import { PortfolioDto } from "@reactive-resume/dto";
import { axios } from "@/client/libs/axios";

export const findPortfolioById = async (data: { id: string }) => {
  const response = await axios.get<PortfolioDto>(`/portfolio/${data.id}`);
  return response.data;
};

export const findPortfolioByUsernameSlug = async (data: { username: string; slug: string }) => {
  const response = await axios.get<PortfolioDto>(`/portfolio/public/${data.username}/${data.slug}`);
  return response.data;
};
