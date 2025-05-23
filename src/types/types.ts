export type RootStackParamList = {
  AdicionarLembrete: { lembrete?: Lembrete };
  Home: undefined;
};

export type Lembrete = {
  titulo: string;
  data: string;
  cor: string;
  icone: string;
  concluido: boolean;
};
