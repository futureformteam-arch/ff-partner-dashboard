"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle } from "lucide-react";
import { api } from "@/lib/api";

// Mock questions - in production, fetch from Core API based on sector
const mockQuestions = [
    {
        id: 1,
        text: "What is your organization's primary business model?",
        type: "text",
        layer: "financial",
    },
    {
        id: 2,
        text: "How many years has your organization been operating?",
        type: "number",
        layer: "financial",
    },
    {
        id: 3,
        text: "Describe your organization's governance structure",
        type: "textarea",
        layer: "governance",
    },
    {
        id: 4,
        text: "What is your organization's annual revenue range?",
        type: "select",
        options: ["<$100K", "$100K-$500K", "$500K-$1M", "$1M-$5M", ">$5M"],
        layer: "financial",
    },
    {
        id: 5,
        text: "How many full-time employees does your organization have?",
        type: "number",
        layer: "competence",
    },
];

export default function AssessmentPage({ params }) {
    const router = useRouter();
    const [assessment, setAssessment] = useState(null);
    const [questions, setQuestions] = useState(mockQuestions);
    const [responses, setResponses] = useState({});
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const loadAssessment = async () => {
            try {
                const data = await api.getAssessment(params.id);
                setAssessment(data);
                // TODO: Fetch questions based on sector
            } catch (error) {
                console.error("Failed to load assessment:", error);
            } finally {
                setLoading(false);
            }
        };

        loadAssessment();
    }, [params.id]);

    const handleResponseChange = (questionId, value) => {
        setResponses((prev) => ({
            ...prev,
            [questionId]: value,
        }));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            // Save current response
            const currentQ = questions[currentQuestion];
            if (responses[currentQ.id]) {
                await api.saveResponse({
                    assessment_id: params.id,
                    question_id: currentQ.id,
                    response_text: responses[currentQ.id],
                });
            }
        } catch (error) {
            console.error("Failed to save:", error);
        } finally {
            setSaving(false);
        }
    };

    const handleNext = async () => {
        await handleSave();
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleSubmit = async () => {
        await handleSave();
        router.push(`/assessment/${params.id}/review`);
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-ff-blue" />
            </div>
        );
    }

    const question = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
        <div className="min-h-screen bg-ff-offWhite">
            {/* Header */}
            <div className="border-b border-ff-lightGray bg-white">
                <div className="mx-auto max-w-4xl px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-lg font-semibold text-ff-black">Trust Assessment</h1>
                            <p className="text-sm text-ff-midGray">{assessment?.partner_org_name}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-medium text-ff-black">
                                Question {currentQuestion + 1} of {questions.length}
                            </p>
                            <p className="text-xs text-ff-midGray">{Math.round(progress)}% Complete</p>
                        </div>
                    </div>
                    <div className="mt-4 h-2 rounded-full bg-ff-lightGray">
                        <div
                            className="h-2 rounded-full bg-ff-blue transition-all"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Question */}
            <div className="mx-auto max-w-4xl px-6 py-12">
                <div className="rounded-xl border border-ff-lightGray bg-white p-8">
                    <div className="mb-6">
                        <span className="rounded-full bg-ff-blue/10 px-3 py-1 text-xs font-medium text-ff-blue capitalize">
                            {question.layer}
                        </span>
                    </div>

                    <h2 className="text-xl font-medium text-ff-black">{question.text}</h2>

                    <div className="mt-6">
                        {question.type === "text" && (
                            <input
                                type="text"
                                value={responses[question.id] || ""}
                                onChange={(e) => handleResponseChange(question.id, e.target.value)}
                                className="w-full rounded-md border border-ff-lightGray px-4 py-3 text-ff-black focus:border-ff-blue focus:outline-none focus:ring-1 focus:ring-ff-blue"
                                placeholder="Enter your answer..."
                            />
                        )}

                        {question.type === "number" && (
                            <input
                                type="number"
                                value={responses[question.id] || ""}
                                onChange={(e) => handleResponseChange(question.id, e.target.value)}
                                className="w-full rounded-md border border-ff-lightGray px-4 py-3 text-ff-black focus:border-ff-blue focus:outline-none focus:ring-1 focus:ring-ff-blue"
                                placeholder="Enter a number..."
                            />
                        )}

                        {question.type === "textarea" && (
                            <textarea
                                value={responses[question.id] || ""}
                                onChange={(e) => handleResponseChange(question.id, e.target.value)}
                                rows={6}
                                className="w-full rounded-md border border-ff-lightGray px-4 py-3 text-ff-black focus:border-ff-blue focus:outline-none focus:ring-1 focus:ring-ff-blue"
                                placeholder="Enter your answer..."
                            />
                        )}

                        {question.type === "select" && (
                            <select
                                value={responses[question.id] || ""}
                                onChange={(e) => handleResponseChange(question.id, e.target.value)}
                                className="w-full rounded-md border border-ff-lightGray px-4 py-3 text-ff-black focus:border-ff-blue focus:outline-none focus:ring-1 focus:ring-ff-blue"
                            >
                                <option value="">Select an option...</option>
                                {question.options?.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>

                    {saving && (
                        <p className="mt-4 flex items-center text-sm text-ff-midGray">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                        </p>
                    )}
                </div>

                {/* Navigation */}
                <div className="mt-6 flex items-center justify-between">
                    <button
                        onClick={handlePrevious}
                        disabled={currentQuestion === 0}
                        className="rounded-md border border-ff-lightGray px-6 py-3 text-sm font-medium text-ff-darkGray hover:bg-ff-offWhite disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>

                    {currentQuestion === questions.length - 1 ? (
                        <button
                            onClick={handleSubmit}
                            className="flex items-center rounded-md bg-ff-blue px-6 py-3 text-sm font-medium text-white hover:bg-blue-600"
                        >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Review & Submit
                        </button>
                    ) : (
                        <button
                            onClick={handleNext}
                            className="rounded-md bg-ff-blue px-6 py-3 text-sm font-medium text-white hover:bg-blue-600"
                        >
                            Next Question
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
