import UrlShortener from './components/UrlShortener';
import Analytics from './components/Analytics';
import Header from './components/Header';
import Layout from './components/Layout';

export default function App() {
  return (
    <Layout>
      <Header />
      <UrlShortener />
      <Analytics />
    </Layout>
  );
}
