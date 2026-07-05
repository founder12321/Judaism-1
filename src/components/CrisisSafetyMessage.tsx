export function CrisisSafetyMessage() {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-950">
      <h2 className="font-medium">Your safety comes first</h2>
      <p className="mt-2 text-sm">
        Judaism 1 is not an emergency or crisis service. If you are in immediate danger or may harm
        yourself or someone else, contact local emergency services now. If you are seeking mental
        health support, please contact a licensed mental health professional or crisis hotline.
      </p>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
        <li>
          Call or text <strong>988</strong> (Suicide &amp; Crisis Lifeline) in the U.S.
        </li>
        <li>
          Text HOME to <strong>741741</strong> (Crisis Text Line)
        </li>
        <li>
          Call <strong>911</strong> if you are in immediate danger
        </li>
      </ul>
      <p className="mt-4 text-sm text-red-900">
        Judaism 1 provides Jewish pastoral guidance for life questions, learning, grief, and
        identity. It is not a substitute for emergency or clinical mental health care.
      </p>
    </div>
  );
}
