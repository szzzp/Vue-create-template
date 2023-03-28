import request from "@/utils/request";

// 查询定时任务调度日志列表
export function listLog(query) {
  return request({
    url: "/system/log/list",
    method: "get",
    params: query,
  });
}

// 查询定时任务调度日志详细
export function getLog(jobLogId) {
  return request({
    url: "/system/log/" + jobLogId,
    method: "get",
  });
}

// 新增定时任务调度日志
export function addLog(data) {
  return request({
    url: "/system/log",
    method: "post",
    data: data,
  });
}

// 修改定时任务调度日志
export function updateLog(data) {
  return request({
    url: "/system/log",
    method: "put",
    data: data,
  });
}

// 删除定时任务调度日志
export function delLog(jobLogId) {
  return request({
    url: "/system/log/" + jobLogId,
    method: "delete",
  });
}
