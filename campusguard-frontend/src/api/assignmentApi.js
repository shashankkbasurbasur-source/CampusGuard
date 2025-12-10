import axiosClient from "./axiosClient";

const assignmentsApi = {
  getAll(classroomId = "default") {
    return axiosClient
      .get(`/teacher/assignments?classroomId=${classroomId}`)
      .then(res => res.data);
  },

  create(payload) {
    return axiosClient.post("/teacher/assignments", payload).then(res => res.data);
  },

  getOne(id) {
    return axiosClient.get(`/teacher/assignments/${id}`).then(res => res.data);
  },

  delete(id) {
    return axiosClient.delete(`/teacher/assignments/${id}`).then(res => res.data);
  },
};

export default assignmentsApi;
