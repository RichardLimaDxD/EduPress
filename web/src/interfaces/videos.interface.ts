import { requestVideoSchema, videosSchema } from "@/schemas/videos.schema";
import { z } from "zod";

type VideoProps = z.infer<typeof videosSchema>;

type RequestVideoProps = z.infer<typeof requestVideoSchema>;

export type { VideoProps, RequestVideoProps };
