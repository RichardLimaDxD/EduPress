import { randomUUID } from 'crypto';

export class Video {
  readonly id: string;

  title: string;

  video_url: string | null;

  courseId: string;

  constructor() {
    this.id = randomUUID();
  }
}
