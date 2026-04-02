

import React, { useState, useEffect } from 'react';
import {
  uploadCSVFile,
  fetchJobStatus,
  cancelJobApi,
  downloadTemplateApi,
  getMyJobsApi
} from '../services/apiService';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [file, setFile] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => { loadMyJobs(); }, []);

  const loadMyJobs = async () => {
    try {
      const res = await getMyJobsApi();

      const formatted = res.jobs.map(job => ({
        jobId: job.jobId,
        status: job.status,
        progress: job.status === 'completed' ? 100 : 0,
        summary: {
          success: job.successCount,
          failed: job.failedCount,
          errors: job.errors
        }
      }));

      setJobs(formatted);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      jobs.forEach(job => {
        if (job.status !== 'completed' && job.status !== 'failed') {
          updateJobStatus(job.jobId);
        }
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [jobs]);

  const updateJobStatus = async (jobId) => {
    try {
      const data = await fetchJobStatus(jobId);

      setJobs(prev =>
        prev.map(j =>
          j.jobId === jobId
            ? { ...j, ...data }
            : j
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Select file");

    setUploading(true);
    try {
      const res = await uploadCSVFile(file);

      setJobs(prev => [
        { jobId: res.jobId, status: 'waiting', progress: 0 },
        ...prev
      ]);

      toast.success(res.message);
      setFile(null);
      document.getElementById('fileInput').value = "";
    } catch (err) {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const cancelJob = async (id) => {
    try {
      await cancelJobApi(id);
      setJobs(prev => prev.filter(j => j.jobId !== id));
      toast.info("Cancelled");
    } catch {
      toast.error("Error cancelling");
    }
  };

  const viewErrors = (errors) => {
    alert(JSON.stringify(errors, null, 2));
  };

  const stats = {
    total: jobs.length,
    completed: jobs.filter(j => j.status === 'completed').length,
    active: jobs.filter(j => j.status !== 'completed' && j.status !== 'failed').length,
    failed: jobs.filter(j => j.status === 'failed').length,
  };

  return (
    <div className="container mt-5">

      
      <div className="d-flex justify-content-between mb-4">
        <h3>CSV Dashboard</h3>
        <button className="btn btn-outline-primary" onClick={downloadTemplateApi}>
          Download Template
        </button>
      </div>

   
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card text-center p-3">
            <h6>Total</h6>
            <h4>{stats.total}</h4>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center p-3">
            <h6>Completed</h6>
            <h4 className="text-success">{stats.completed}</h4>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center p-3">
            <h6>Active</h6>
            <h4 className="text-primary">{stats.active}</h4>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center p-3">
            <h6>Failed</h6>
            <h4 className="text-danger">{stats.failed}</h4>
          </div>
        </div>
      </div>

      
      <div className="card mb-4">
        <div className="card-body">
          <form onSubmit={handleUpload} className="d-flex gap-2">
            <input
              type="file"
              id="fileInput"
              className="form-control"
              accept=".csv"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button className="btn btn-primary" disabled={uploading}>
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </form>
        </div>
      </div>

    
      <div className="card">
        <div className="card-body">
          <h5 className="mb-3">My Jobs</h5>

          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>Job ID</th>
                <th>Status</th>
                <th>Progress</th>
                <th>Success / Failed</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {jobs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    No jobs
                  </td>
                </tr>
              ) : (
                jobs.map(job => (
                  <tr key={job.jobId}>
                    <td>{job.jobId}</td>

                    <td>
                      <span className={`badge bg-${
                        job.status === 'completed'
                          ? 'success'
                          : job.status === 'failed'
                          ? 'danger'
                          : 'info'
                      }`}>
                        {job.status}
                      </span>
                    </td>

                    <td style={{ width: '200px' }}>
                      <div className="progress">
                        <div
                          className="progress-bar"
                          style={{ width: `${job.progress || 0}%` }}
                        ></div>
                      </div>
                      {job.progress || 0}%
                    </td>

                    <td>
                      {job.summary
                        ? `${job.summary.success} / ${job.summary.failed}`
                        : '-'}
                    </td>

                    <td>
                      {job.status !== 'completed' && job.status !== 'failed' && (
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => cancelJob(job.jobId)}
                        >
                          Cancel
                        </button>
                      )}

                      {job.status === 'completed' && job.summary?.failed > 0 && (
                        <button
                          className="btn btn-sm btn-warning ms-2"
                          onClick={() => viewErrors(job.summary.errors)}
                        >
                          Errors
                        </button>
                      )}
                    </td>

                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;