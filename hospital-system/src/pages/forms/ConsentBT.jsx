import ConsentForm from "./ConsentForm";
export default function ConsentBT({ onBack }) {
  return <ConsentForm title="Consent for Blood Transfusion" procedureDefault="BLOOD TRANSFUSION" onBack={onBack} />;
}