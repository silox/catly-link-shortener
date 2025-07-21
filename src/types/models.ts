type CreateUpdateMixin = {
  createdAt?: string;
  updatedAt?: string;
}

export type Link = CreateUpdateMixin & {
  id: string;
  shortenedUrl: string;
  destinationUrl: string;
  userid?: string;
  advert?: string;
  expirationDate?: string;
  clickCount?: number;
  title: string;
  fileId: string | null;
}

export type LinkStat = {
  id: string;
  date: string;
  link: string;
  clickCount: number;
}

export type LinkHistory = {
  [key: string]: number
}
