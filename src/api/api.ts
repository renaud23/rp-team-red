export type BulletinIndividuel = {
  id: number;
  raisonSociale: string;
};

export const API = {
  getBulletin: (): Promise<Array<BulletinIndividuel>> => {
    return fetch(`${import.meta.env.VITE_BASE_URL}/api/pcs2020/bulletins`)
      .then((r) => r.json())
      .catch(() => {
        throw new Error("Impossible de ...");
      });
  },
};
