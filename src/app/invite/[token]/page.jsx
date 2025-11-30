"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, XCircle, Loader2, Mail } from "lucide-react";
import { api } from "@/lib/api";

export default function InvitationPage({ params }) {
    const router = useRouter();
    const [invitation, setInvitation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [accepting, setAccepting] = useState(false);

    useEffect(() => {
        const loadInvitation = async () => {
            try {
                const data = await api.getInvitation(params.token);
                setInvitation(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadInvitation();
    }, [params.token]);

    const handleAccept = async () => {
        setAccepting(true);
        try {
            await api.acceptInvitation(params.token);
            router.push(`/assessment/${invitation.assessment_id}`);
        } catch (err) {
            setError(err.message);
            setAccepting(false);
        }
    };

    const handleDecline = async () => {
        try {
            await api.declineInvitation(params.token, "Declined by partner");
            router.push("/declined");
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-ff-blue" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="max-w-md rounded-xl border border-ff-red bg-white p-8 text-center">
                    <XCircle className="mx-auto h-12 w-12 text-ff-red" />
                    <h1 className="mt-4 text-xl font-semibold text-ff-black">Invalid Invitation</h1>
                    <p className="mt-2 text-sm text-ff-midGray">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen items-center justify-center p-6">
            <div className="w-full max-w-2xl rounded-xl border border-ff-lightGray bg-white p-8">
                <div className="text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-ff-blue/10">
                        <Mail className="h-8 w-8 text-ff-blue" />
                    </div>
                    <h1 className="mt-6 text-2xl font-semibold text-ff-black">
                        You've Been Invited to Complete an Assessment
                    </h1>
                    <p className="mt-2 text-sm text-ff-midGray">
                        {invitation.partner_org_name} has been invited to complete a trust assessment
                    </p>
                </div>

                <div className="mt-8 space-y-4 rounded-lg bg-ff-offWhite p-6">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-ff-midGray">Assessment Type</span>
                        <span className="text-sm font-medium text-ff-black">Trust Assessment</span>
                    </div>
                    {invitation.deadline && (
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-ff-midGray">Deadline</span>
                            <span className="text-sm font-medium text-ff-black">
                                {new Date(invitation.deadline).toLocaleDateString()}
                            </span>
                        </div>
                    )}
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-ff-midGray">Status</span>
                        <span className="rounded-full bg-ff-amber/10 px-3 py-1 text-xs font-medium text-ff-amber">
                            {invitation.status}
                        </span>
                    </div>
                </div>

                <div className="mt-8 flex gap-4">
                    <button
                        onClick={handleDecline}
                        disabled={accepting}
                        className="flex-1 rounded-md border border-ff-lightGray px-4 py-3 text-sm font-medium text-ff-darkGray hover:bg-ff-offWhite disabled:opacity-50"
                    >
                        Decline
                    </button>
                    <button
                        onClick={handleAccept}
                        disabled={accepting}
                        className="flex flex-1 items-center justify-center rounded-md bg-ff-blue px-4 py-3 text-sm font-medium text-white hover:bg-blue-600 disabled:opacity-50"
                    >
                        {accepting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Accepting...
                            </>
                        ) : (
                            <>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Accept & Start Assessment
                            </>
                        )}
                    </button>
                </div>

                <p className="mt-6 text-center text-xs text-ff-midGray">
                    By accepting, you agree to provide accurate information for this assessment.
                </p>
            </div>
        </div>
    );
}
