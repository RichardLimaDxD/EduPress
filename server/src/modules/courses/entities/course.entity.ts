import { randomUUID } from 'crypto';

export class Course {
  readonly id: string;

  title: string;

  description: string;

  price: number;

  userId: string;

  image: string | null;

  categoryId: string;

  createdAt: Date;
  updatedAt: Date;

  constructor() {
    this.id = randomUUID();
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
