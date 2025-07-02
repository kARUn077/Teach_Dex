import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  useCompleteCourseMutation,
  useGetCourseProgressQuery,
  useInCompleteCourseMutation,
  useUpdateLectureProgressMutation,
} from "@/features/api/courseProgressApi";
import { CheckCircle, CheckCircle2, CirclePlay, Lock } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseProgress = () => {
  const { courseId } = useParams();
  const { data, isLoading, isError, refetch } = useGetCourseProgressQuery(courseId);

  const [updateLectureProgress] = useUpdateLectureProgressMutation();
  const [completeCourse, { isSuccess: completedSuccess }] = useCompleteCourseMutation();
  const [inCompleteCourse, { isSuccess: inCompletedSuccess }] = useInCompleteCourseMutation();

  const [currentLecture, setCurrentLecture] = useState(null);

  useEffect(() => {
    if (completedSuccess || inCompletedSuccess) {
      refetch();
      toast.success(
        completedSuccess 
          ? "Course marked as completed" 
          : "Course marked as incomplete"
      );
    }
  }, [completedSuccess, inCompletedSuccess, refetch]);

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data?.data) return <p>Failed to load course details</p>;

  const { courseDetails, progress, completed, purchased } = data.data;
  const { courseTitle, lectures = [] } = courseDetails;

  const activeLecture = currentLecture || (lectures.length > 0 ? lectures[0] : null);

  const isLectureCompleted = (lectureId) =>
    progress?.some((p) => p.lectureId === lectureId && p.viewed);

  const isLectureAccessible = (lecture) => {
    if (!lecture) return false;
    return purchased || lecture.isPreviewFree;
  };

  const handleLectureProgress = async (lectureId) => {
    if (!isLectureAccessible(lectures.find(l => l._id === lectureId))) return;
    
    try {
      await updateLectureProgress({ courseId, lectureId });
      await refetch();
    } catch (error) {
      console.error("Failed to update lecture progress", error);
    }
  };

  const handleSelectLecture = (lecture) => {
    setCurrentLecture(lecture);
    if (isLectureAccessible(lecture)) {
      handleLectureProgress(lecture._id);
    }
  };

  const handleCompleteCourse = async () => {
    try {
      await completeCourse(courseId);
    } catch (error) {
      toast.error("Failed to mark course as completed");
    }
  };

  const handleInCompleteCourse = async () => {
    try {
      await inCompleteCourse(courseId);
    } catch (error) {
      toast.error("Failed to mark course as incomplete");
    }
  };

  const getLectureStatus = (lecture) => {
    if (!isLectureAccessible(lecture)) return "locked";
    return isLectureCompleted(lecture._id) ? "completed" : "incomplete";
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Header */}
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">{courseTitle}</h1>
        <Button
          onClick={completed ? handleInCompleteCourse : handleCompleteCourse}
          variant={completed ? "outline" : "default"}
          disabled={!purchased}
        >
          {completed ? (
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              <span>Completed</span>
            </div>
          ) : (
            "Mark as completed"
          )}
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Video Section */}
        <div className="flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4">
          {activeLecture && isLectureAccessible(activeLecture) ? (
            <>
              <video
                src={activeLecture.videoInfo?.videoUrl}
                controls
                className="w-full h-auto md:rounded-lg"
                onPlay={() => handleLectureProgress(activeLecture._id)}
              />
              <div className="mt-2">
                <h3 className="font-medium text-lg">
                  {`Lecture ${
                    lectures.findIndex((lec) => lec._id === activeLecture._id) + 1
                  }: ${activeLecture.lectureTitle}`}
                </h3>
              </div>
            </>
          ) : (
            <div className="w-full aspect-video flex flex-col items-center justify-center bg-gray-100 text-center text-gray-600 p-6 rounded-lg">
              <Lock className="h-12 w-12 mb-4 text-gray-400" />
              <h3 className="text-xl font-medium mb-2">Lecture Locked</h3>
              <p className="max-w-md">
                {activeLecture?.isPreviewFree
                  ? "This preview will be available soon"
                  : "Please purchase the course to access this content"}
              </p>
              {!purchased && (
                <Button className="mt-4" variant="default">
                  Purchase Course
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Sidebar - Lecture List */}
        <div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0">
          <h2 className="font-semibold text-xl mb-4">Course Lectures</h2>
          <div className="flex-1 overflow-y-auto">
            {lectures.map((lecture) => {
              const status = getLectureStatus(lecture);
              return (
                <Card
                  key={lecture._id}
                  className={`mb-3 transition transform ${
                    lecture._id === activeLecture?._id
                      ? "bg-gray-200 dark:bg-gray-800"
                      : ""
                  } ${
                    status === 'locked' 
                      ? 'opacity-70 cursor-not-allowed' 
                      : 'hover:cursor-pointer hover:bg-gray-50'
                  }`}
                  onClick={() => status !== 'locked' && handleSelectLecture(lecture)}
                >
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center">
                      {status === "completed" ? (
                        <CheckCircle2 size={24} className="text-green-500 mr-2" />
                      ) : status === "locked" ? (
                        <Lock size={24} className="text-gray-400 mr-2" />
                      ) : (
                        <CirclePlay size={24} className="text-gray-500 mr-2" />
                      )}
                      <CardTitle className="text-lg font-medium">
                        {lecture.lectureTitle}
                      </CardTitle>
                    </div>
                    {status === "completed" && (
                      <Badge variant="outline" className="bg-green-200 text-green-600">
                        Completed
                      </Badge>
                    )}
                    {status === "locked" && !lecture.isPreviewFree && (
                      <Badge variant="outline" className="bg-gray-200 text-gray-600">
                        Locked
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;