export type Status = "pending" | "inprogress" | "completed";

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: Status;
  createdAt: number;
};
