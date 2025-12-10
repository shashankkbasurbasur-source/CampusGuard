import axiosClient from "./axiosClient";

const submissionsApi = {
    list(params = {}) {
    return axiosClient.get("/teacher/submissions", { params }).then(res => res.data);
  },

  getOne(id) {
    return axiosClient.get(`/teacher/submissions/${id}`).then(res => res.data);
  },

  grade(id, payload) {
    return axiosClient.post(`/teacher/submissions/${id}/grade`, payload).then(res => res.data);
  },

  queueAutograde(id) {
    return axiosClient.post(`/teacher/autograde/${id}/run`).then(res => res.data);
  },

  uploadFile(id, file) {
    const form = new FormData();
    form.append("file", file);

    return axiosClient.post(`/teacher/submissions/${id}/files`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
};

export default submissionsApi;
 