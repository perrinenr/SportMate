export function LoadingBox({ text = "Loading from database..." }) {
  return <div className="bg-white rounded-xl p-8 shadow-sm text-stone-500">{text}</div>;
}

export function ErrorBox({ message }) {
  if (!message) return null;
  return <div className="bg-error-container text-on-error-container rounded-xl p-4 font-semibold">{message}</div>;
}

export function EmptyBox({ text }) {
  return <div className="bg-white rounded-xl p-8 shadow-sm text-stone-500">{text}</div>;
}
