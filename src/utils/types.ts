export type JWTPayload = {
  id: number;
  name: string;
  isAdmin: boolean;
};

export type singleParamsProps = {
  params: Promise<{ id: string }>;
};
