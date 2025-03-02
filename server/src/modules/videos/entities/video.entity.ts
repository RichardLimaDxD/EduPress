import { randomUUID } from 'crypto';

export class Video {
  readonly id: string;
  video_url: string | null;

  moduleId: string;

  constructor() {
    this.id = randomUUID();
  }
}
