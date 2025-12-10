import axiosClient, { uploadForm } from "./axiosClient";

/**
 * teacherApi
 * - All teacher-related endpoints used by the dashboard
 * - Adapt endpoint paths to your Flask routes if different
 */

const teacherApi = {
  // Classrooms / context
  getClassrooms() {
    return axiosClient.get("/api/teacher/classrooms").then((r) => r.data);
  },

  // Assignments
  getAssignments(classroomId) {
    return axiosClient
      .get("/api/teacher/assignments", { params: { classroomId } })
      .then((r) => r.data);
  },
  getAssignment(assignmentId) {
    return axiosClient.get(`/api/teacher/assignments/${assignmentId}`).then((r) => r.data);
  },
  createAssignment(payload) {
    // payload: { classroomId, title, description, dueAt, pointsTotal, labId, attachments[] }
    return axiosClient.post("/api/teacher/assignments", payload).then((r) => r.data);
  },
  updateAssignment(assignmentId, payload) {
    return axiosClient.put(`/api/teacher/assignments/${assignmentId}`, payload).then((r) => r.data);
  },
  deleteAssignment(assignmentId) {
    return axiosClient.delete(`/api/teacher/assignments/${assignmentId}`).then((r) => r.data);
  },

  // Submissions
  getSubmissions({ classroomId, assignmentId, studentId, status, limit = 100, offset = 0 } = {}) {
    return axiosClient
      .get("/api/teacher/submissions", { params: { classroomId, assignmentId, studentId, status, limit, offset } })
      .then((r) => r.data);
  },
  getSubmission(submissionId) {
    return axiosClient.get(`/api/teacher/submissions/${submissionId}`).then((r) => r.data);
  },
  uploadSubmissionFile(submissionId, file, meta = {}) {
    // file: File object, meta: { filename, type, ... }
    const form = new FormData();
    form.append("file", file);
    Object.entries(meta || {}).forEach(([k, v]) => form.append(k, v));
    return uploadForm(`/api/teacher/submissions/${submissionId}/files`, form);
  },

  // Autograde
  runAutograde(submissionId) {
    return axiosClient.post(`/api/teacher/autograde/${submissionId}/run`).then((r) => r.data);
  },
  getAutogradeQueue({ limit = 100, offset = 0 } = {}) {
    return axiosClient.get("/api/teacher/autograde/queue", { params: { limit, offset } }).then((r) => r.data);
  },
  getAutogradeResult(submissionId) {
    return axiosClient.get(`/api/teacher/autograde/${submissionId}`).then((r) => r.data);
  },

  // Manual grading
  manualGrade(submissionId, { points, feedback }) {
    return axiosClient.post(`/api/teacher/submissions/${submissionId}/grade`, { points, feedback }).then((r) => r.data);
  },

  // Students / enrollments
  getStudents({ classroomId } = {}) {
    return axiosClient.get("/api/teacher/students", { params: { classroomId } }).then((r) => r.data);
  },
  inviteStudent(classroomId, email) {
    return axiosClient.post("/api/teacher/students/invite", { classroomId, email }).then((r) => r.data);
  },
  removeStudent(classroomId, studentId) {
    return axiosClient.delete(`/api/teacher/classrooms/${classroomId}/students/${studentId}`).then((r) => r.data);
  },

  // Gradebook
  getGradebook({ classroomId }) {
    return axiosClient.get("/api/teacher/gradebook", { params: { classroomId } }).then((r) => r.data);
  },

  // Activity logs
  getActivityLogs({ classroomId, limit = 200, offset = 0, action, resourceType, q } = {}) {
    return axiosClient.get("/api/teacher/activity-logs", { params: { classroomId, limit, offset, action, resourceType, q } }).then((r) => r.data);
  },

  // Settings / admin
  getSettings({ classroomId }) {
    return axiosClient.get(`/api/teacher/classrooms/${classroomId}/settings`).then((r) => r.data);
  },
  updateSettings(classroomId, payload) {
    return axiosClient.post(`/api/teacher/classrooms/${classroomId}/settings`, payload).then((r) => r.data);
  },
  resetSubmissions(classroomId) {
    return axiosClient.post(`/api/teacher/classrooms/${classroomId}/reset-submissions`).then((r) => r.data);
  },
  deleteClassroom(classroomId) {
    return axiosClient.delete(`/api/teacher/classrooms/${classroomId}`).then((r) => r.data);
  },

  // Utility endpoints (download file)
  downloadFile(fileId) {
    // returns response with arraybuffer; caller should handle blob creation
    return axiosClient.get(`/api/files/${fileId}`, { responseType: "arraybuffer" }).then((r) => r.data);
  },
};

export default teacherApi;
