import type { Estabelecimento } from "@/types/establishment";

export type Monitor = {
  id: number;
  name: string;
  establishment: Estabelecimento;
  establishment_id: number;
  paired: boolean;
  code: string;
  playlist_id: number;
  _count: {
    images: number;
  };
  createdAt: string;
};
