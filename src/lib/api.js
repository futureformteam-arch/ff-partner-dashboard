const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function fetchAPI(endpoint, options = {}) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: "An error occurred" }));
        throw new Error(error.detail || "Request failed");
    }

    return response.json();
}

export const api = {
    // Invitations
    getInvitation: (token) => fetchAPI(`/api/v1/invitations/${token}`),

    acceptInvitation: (token) => fetchAPI(`/api/v1/invitations/${token}/accept`, {
        method: "POST",
    }),

    declineInvitation: (token, reason) => fetchAPI(`/api/v1/invitations/${token}/decline`, {
        method: "POST",
        body: JSON.stringify({ reason }),
    }),

    // Assessments
    getAssessment: (id) => fetchAPI(`/api/v1/assessments/${id}`),

    // Respondents
    createRespondent: (data) => fetchAPI("/api/v1/respondents", {
        method: "POST",
        body: JSON.stringify(data),
    }),

    // Responses
    saveResponse: (data) => fetchAPI("/api/v1/responses", {
        method: "POST",
        body: JSON.stringify(data),
    }),

    submitResponse: (id) => fetchAPI(`/api/v1/responses/${id}/submit`, {
        method: "POST",
    }),

    // Evidence
    getUploadUrl: (data) => fetchAPI("/api/v1/evidence/upload-url", {
        method: "POST",
        body: JSON.stringify(data),
    }),

    createEvidence: (data) => fetchAPI("/api/v1/evidence", {
        method: "POST",
        body: JSON.stringify(data),
    }),

    // Submit assessment
    submitAssessment: (id) => fetchAPI(`/api/v1/assessments/${id}/submit`, {
        method: "POST",
    }),
};
