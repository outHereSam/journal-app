export interface Entry {
  _id?: string;
  title: string;
  content: string;
  mood: string;
  createdAt: string;
  attachments?: FileAttachment[];
}

export interface FileAttachment {
  name: string;
  type: string;
  url: string;
}
