import type { Estabelecimento } from "@/types/establishment";

export type Monitor = {
  id: number;
  name: string;
  establishment: Estabelecimento;
  _count: {
    images: number;
  };
  createdAt: string;
};
