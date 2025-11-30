export default function DeclinedPage() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="max-w-md rounded-xl border border-ff-lightGray bg-white p-8 text-center">
                <h1 className="text-xl font-semibold text-ff-black">Invitation Declined</h1>
                <p className="mt-2 text-sm text-ff-midGray">
                    You have declined the assessment invitation. The organization has been notified.
                </p>
            </div>
        </div>
    );
}
