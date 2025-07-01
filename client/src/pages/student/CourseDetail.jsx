import BuyCourseButton from "@/components/BuyCourseButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";
import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetCourseDetailWithStatusQuery(courseId);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [previewTitle, setPreviewTitle] = useState("");

  useEffect(() => {
    if (data?.course?.lectures?.length > 0) {
      const firstPreview = data.course.lectures.find(lec => lec.isPreviewFree);
      if (firstPreview) {
        setPreviewUrl(firstPreview.videoUrl);
        setPreviewTitle(firstPreview.lectureTitle);
        setSelectedLecture(firstPreview);
      }
    }
  }, [data]);

  if (isLoading) return <h1 className="text-[#537D5D] dark:text-[#D8F3DC]">Loading...</h1>;
  if (isError) return <h1 className="text-red-500">Failed to load course details</h1>;

  const { course, purchased } = data;

  const handleContinueCourse = () => {
    if (purchased) navigate(`/course-progress/${courseId}`);
  };

  const handleLectureClick = (lecture) => {
    if (purchased || lecture.isPreviewFree) {
      setPreviewUrl(lecture.videoUrl);
      setPreviewTitle(lecture.lectureTitle);
      setSelectedLecture(lecture);
    }
  };

  return (
    <div className="space-y-5 bg-white">
      {/* Header */}
      <div className="bg-[#537D5D] text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl">
            {course?.courseTitle || "Untitled Course"}
          </h1>
          <p className="text-base md:text-lg">
            {course?.subTitle || "No subtitle provided"}
          </p>
          <p>
            Created By{" "}
            <span className="text-[#D8F3DC] underline italic">
              {course?.creator?.name || "Unknown Creator"}
            </span>
          </p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p>Last updated {course?.createdAt?.split("T")[0] || "N/A"}</p>
          </div>
          <p>Students enrolled: {course?.enrolledStudents?.length ?? 0}</p>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
        {/* Left: Description + Lectures */}
        <div className="w-full lg:w-1/2 space-y-5">
          <h1 className="font-bold text-xl md:text-2xl text-[#1B4332]">Description</h1>
          <p
            className="text-sm text-[#3A5A40]"
            dangerouslySetInnerHTML={{
              __html: course?.description || "No description available.",
            }}
          />
          <Card className="border-[#D8F3DC]">
            <CardHeader>
              <CardTitle className="text-[#1B4332]">Course Content</CardTitle>
              <CardDescription className="text-[#3A5A40]">
                {course?.lectures?.length ?? 0} lectures
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {course?.lectures?.length > 0 ? (
                course.lectures.map((lecture, idx) => (
                  <div
                    key={lecture?._id || idx}
                    className={`flex items-center gap-3 text-sm cursor-pointer ${
                      selectedLecture?._id === lecture._id 
                        ? "text-[#537D5D] font-medium" 
                        : "text-[#3A5A40]"
                    }`}
                    onClick={() => handleLectureClick(lecture)}
                  >
                    <span className="text-[#537D5D]">
                      {(purchased || lecture?.isPreviewFree) ? (
                        <PlayCircle size={14} />
                      ) : (
                        <Lock size={14} />
                      )}
                    </span>
                    <p>{lecture?.lectureTitle || "Untitled Lecture"}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-[#3A5A40]">No lectures available yet.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right: Video + Price */}
        <div className="w-full lg:w-1/3">
          <Card className="border-[#D8F3DC]">
            <CardContent className="p-4 flex flex-col">
              <div className="w-full aspect-video mb-4 rounded overflow-hidden">
                {previewUrl ? (
                  <ReactPlayer
                    url={previewUrl}
                    controls
                    width="100%"
                    height="100%"
                  />
                ) : (
                  <div className="w-full h-full bg-[#F0F7F4] text-[#3A5A40] flex items-center justify-center text-center p-4">
                    <div>
                      <Lock size={24} className="mx-auto mb-2 text-[#537D5D]" />
                      <p className="text-sm">Preview not available</p>
                      <p className="text-sm font-medium">Purchase course to unlock this lecture</p>
                    </div>
                  </div>
                )}
              </div>

              <h1 className="text-center text-base font-medium text-[#1B4332]">
                {previewTitle || "Lecture Preview"}
              </h1>
              <Separator className="my-2 bg-[#D8F3DC]" />
              <h1 className="text-lg md:text-xl font-semibold text-center text-[#537D5D]">
                ₹{course?.coursePrice ?? "N/A"}
              </h1>
            </CardContent>
            <CardFooter className="flex justify-center p-4">
              {purchased ? (
                <Button 
                  onClick={handleContinueCourse} 
                  className="w-full bg-[#537D5D] hover:bg-[#3A5A40]"
                >
                  Continue Course
                </Button>
              ) : (
                <BuyCourseButton courseId={courseId} />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;