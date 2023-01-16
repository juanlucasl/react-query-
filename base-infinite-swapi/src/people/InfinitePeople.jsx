import InfiniteScroll from 'react-infinite-scroller';
import { Person } from './Person';
import { useInfiniteQuery } from 'react-query';

const initialUrl = 'https://swapi.dev/api/people/';
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  const { data, error, fetchNextPage, hasNextPage, isLoading, isError } = useInfiniteQuery(
    'sw-people',
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
      // The swapi api returns the url for the next page of data.
      getNextPageParam: (lastPage) => lastPage.next || undefined
    }
  );

  if (isLoading) return <div className="loading">Loading...</div>
  if (isError) return <div>Error fetching data: {error.toString()}</div>

  const renderDataPages = () => {
    // Map over pages.
    return data.pages.map((pageData) => {
      // Map over data of each page.
      return pageData.results.map((person) => (
        <Person
          key={person.name}
          name={person.name}
          hairColor={person.hair_color}
          eyeColor={person.eye_color}
        />
      ))
    });
  }

  return (
    <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
      {renderDataPages()}
    </InfiniteScroll>);
}
