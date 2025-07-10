export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {children}
      </div>
    </div>
  );
}
