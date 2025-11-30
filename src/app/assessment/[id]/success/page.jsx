import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="max-w-md rounded-xl border border-ff-lightGray bg-white p-8 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h1 className="mt-6 text-xl font-semibold text-ff-black">
                    Assessment Submitted Successfully!
                </h1>
                <p className="mt-2 text-sm text-ff-midGray">
                    Thank you for completing the trust assessment. Your responses have been submitted
                    and will be reviewed by our team.
                </p>
                <p className="mt-4 text-sm text-ff-midGray">
                    You will be notified once the assessment is complete.
                </p>
            </div>
        </div>
    );
}
