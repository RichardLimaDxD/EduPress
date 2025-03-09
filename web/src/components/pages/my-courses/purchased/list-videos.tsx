"use client";

import { VideoProps } from "@/interfaces/videos.interface";
import { Clock } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const ListVideos = ({ data }: { data: VideoProps[] }) => {
  const searchParams = useSearchParams();
  const currentVideoId = searchParams.get("videoId");

  return (
    <div className="lg:w-1/3 order-2 lg:ml-auto">
      <div className="bg-gray-50 rounded-xl border-2 border-orange-200 overflow-hidden shadow-md">
        <div className="p-4 bg-orange-100 border-b border-orange-200">
          <h2 className="text-xl font-bold text-orange-800">Course Content</h2>
          <p className="text-sm text-orange-700 mt-1">Up next in this course</p>
        </div>

        <div className="divide-y divide-gray-200">
          {data.map((video) => {
            const isActive = video.id === currentVideoId;
            return (
              <Link
                href={`/my-courses/${data[0].courseId}?videoId=${video.id}`}
                key={video.id}
                className={`block p-4 transition-colors ${
                  isActive ? "bg-orange-300" : "hover:bg-gray-100"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-24 h-16 flex-shrink-0 rounded-md overflow-hidden bg-gray-200"></div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 truncate">
                      {video.title}
                    </p>
                    <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export { ListVideos };
