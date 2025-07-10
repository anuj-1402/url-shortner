import Button from './Button';

export default function SuccessCard({ title, url, onCopy }) {
  return (
    <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
      <label className="block text-sm font-medium text-green-800 mb-2">{title}</label>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={url}
          readOnly
          className="flex-1 px-3 py-2 bg-white border border-green-300 rounded-md text-green-800 focus:outline-none"
        />
        <Button
          onClick={onCopy}
          variant="success"
          size="medium"
        >
          Copy
        </Button>
      </div>
    </div>
  );
}
