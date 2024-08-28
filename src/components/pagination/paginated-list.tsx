import { useState, useEffect } from 'react'

import { Pagination } from './pagination'
import { APP_CONFIGS } from '../../app-config'
import { useNewsData } from '../../hooks/use-news-data'
import { News } from '../../types/news.types'

// TODO Notice the hard coded page size
const PAGE_SIZE = 10

export const PaginatedList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)

  const { fetchNews, news, totalResults, isLoading, error } = useNewsData({
    apiKey: APP_CONFIGS.NEWS_API_KEY,
  })

  // TODO Notice the query param required by the `everything` news endpoint!

  useEffect(() => {
    fetchNews({ query: 'a', page: currentPage, pageSize: PAGE_SIZE })
  }, [currentPage, fetchNews])

  if (error) {
    return <p className="text-lg text-red-400">{error}</p>
  }

  return (
    <div>
      <h1 className="text-3xl text-indigo-300">Interesting news</h1>

      <div className="h-96">
        {isLoading ? (
          <p className="flex items-center justify-center h-full my-auto text-2xl text-gray-300 center">
            Loading news...
          </p>
        ) : (
          <ul className="flex flex-col h-auto my-4 text-white gap-y-2">
            {news.map((item: News, i: number) => (
              <li className="text-blue-400 underline hover:text-violet-400" key={i}>
                <a href={item.url} target="_blank">
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(totalResults / PAGE_SIZE)}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}
