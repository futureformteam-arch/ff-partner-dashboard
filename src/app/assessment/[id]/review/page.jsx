"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { api } from "@/lib/api";

export default function ReviewPage({ params }) {
    const router = useRouter();
    const [assessment, setAssessment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadAssessment = async () => {
            try {
                const data = await api.getAssessment(params.id);
                setAssessment(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadAssessment();
    }, [params.id]);

    const handleSubmit = async () => {
        setSubmitting(true);
        try {
            await api.submitAssessment(params.id);
            router.push(`/assessment/${params.id}/success`);
        } catch (err) {
            setError(err.message);
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-ff-blue" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-ff-offWhite">
            <div className="mx-auto max-w-4xl px-6 py-12">
                <div className="rounded-xl border border-ff-lightGray bg-white p-8">
                    <div className="text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-ff-blue/10">
                            <CheckCircle className="h-8 w-8 text-ff-blue" />
                        </div>
                        <h1 className="mt-6 text-2xl font-semibold text-ff-black">
                            Review Your Assessment
                        </h1>
                        <p className="mt-2 text-sm text-ff-midGray">
                            Please review your responses before submitting
                        </p>
                    </div>

                    <div className="mt-8 space-y-4">
                        <div className="rounded-lg bg-ff-offWhite p-6">
                            <h2 className="text-lg font-medium text-ff-black">Assessment Summary</h2>
                            <div className="mt-4 space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-ff-midGray">Organization</span>
                                    <span className="text-sm font-medium text-ff-black">
                                        {assessment?.partner_org_name}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-ff-midGray">Questions Answered</span>
                                    <span className="text-sm font-medium text-ff-black">5 of 5</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-ff-midGray">Evidence Uploaded</span>
                                    <span className="text-sm font-medium text-ff-black">0 files</span>
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="flex items-center gap-3 rounded-lg bg-ff-red/10 p-4">
                                <AlertCircle className="h-5 w-5 text-ff-red" />
                                <p className="text-sm text-ff-red">{error}</p>
                            </div>
                        )}
                    </div>

                    <div className="mt-8 flex gap-4">
                        <button
                            onClick={() => router.back()}
                            disabled={submitting}
                            className="flex-1 rounded-md border border-ff-lightGray px-4 py-3 text-sm font-medium text-ff-darkGray hover:bg-ff-offWhite disabled:opacity-50"
                        >
                            Go Back
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={submitting}
                            className="flex flex-1 items-center justify-center rounded-md bg-ff-blue px-4 py-3 text-sm font-medium text-white hover:bg-blue-600 disabled:opacity-50"
                        >
                            {submitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Submit Assessment
                                </>
                            )}
                        </button>
                    </div>

                    <p className="mt-6 text-center text-xs text-ff-midGray">
                        Once submitted, you will not be able to make changes to your responses.
                    </p>
                </div>
            </div>
        </div>
    );
}
