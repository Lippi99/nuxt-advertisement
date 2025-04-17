import type { Estabelecimento } from "@/types/establishment";

export type Monitor = {
  id: number;
  name: string;
  establishment: Estabelecimento;
  establishmentId: number;
  playlistId: number;
  _count: {
    images: number;
  };
  createdAt: string;
};
