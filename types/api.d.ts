type RefuelDTO = Omit<Refuel, 'id'>;

interface RequestParams {
  params: Record<string, string>;
}
