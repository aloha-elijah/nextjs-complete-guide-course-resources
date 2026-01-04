'use client';
// import { DUMMY_NEWS } from '@/dummy-news';
import NewsList from '@/components/news-list';
import { useEffect, useState } from 'react';

export default function NewsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newsData, setNewsData] = useState();

  useEffect(() => {
    async function fetchData() {
      // Simulate data fetching
      setIsLoading(true);
      console.log('Fetching data from http://localhost:8080');
      const response = await fetch('http://localhost:8080/news');
      if (!response.ok) {
        setIsLoading(false);
        setError('Failed to fetch data');
      }
      const data = await response.json();
      setIsLoading(false);
      setNewsData(data);
      console.log('Fetched data:', data);
    }
    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  let newContent;

  if (newsData) {
    newContent = <NewsList news={newsData} />;
  }

  return (
    <>
      <h1>News Page</h1>
      {newContent}
    </>
  );
}
