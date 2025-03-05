import { randomUUID } from 'crypto';

export class Course {
  readonly id: string;

  title: string;

  description: string;

  price: number;

  image: string | null;

  video_url: string | null;

  userId: string;

  categoryId: string;

  createdAt: Date;
  updatedAt: Date;

  constructor() {
    this.id = randomUUID();
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
