import axiosClient from "./axiosClient";

const studentApi = {
  getProfile() {
    return axiosClient.get("/student/profile").then(res => res.data);
  },

  submitAssignment(assignmentId, payload) {
    return axiosClient
      .post(`/student/assignments/${assignmentId}/submit`, payload)
      .then(res => res.data);
  },

  uploadFile(submissionId, file) {
    const form = new FormData();
    form.append("file", file);

    return axiosClient.post(`/student/submissions/${submissionId}/file`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  getMySubmissions() {
    return axiosClient.get("/student/submissions").then(res => res.data);
  },
};

export default studentApi;
