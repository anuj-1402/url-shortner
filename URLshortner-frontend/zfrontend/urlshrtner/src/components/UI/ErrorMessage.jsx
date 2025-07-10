export default function ErrorMessage({ message }) {
  if (!message) return null;
  
  return (
    <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-md p-3">
      {message}
    </div>
  );
}
