interface User {
  username: string;
  id: number;
}

interface ITodo {
  id?: number;
  title: string;
  detail: string;
  status?: boolean;
}

interface IModal {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}


export type { IModal, ITodo };