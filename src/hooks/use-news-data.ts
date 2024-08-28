import axios from 'axios'
import { useState, useCallback } from 'react'

import { APP_CONFIGS } from '../app-config'
import { News } from '../types/news.types'

type HookParams = {
  apiKey: string
}

type ErrorWithMessage = {
  response: {
    data: {
      message: string
    }
  }
}

type IApiResponse = {
  articles: News[]
  totalResults: number
  message?: string
}

export const useNewsData = ({ apiKey }: HookParams) => {
  const [news, setNews] = useState<News[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [loadingError, setLoadingError] = useState<string | null>(null)

  const [totalResults, setTotalResults] = useState<number>(0)

  const fetchNews = useCallback(
    async ({
      query = 'a',
      page = 1,
      pageSize = 10,
    }: {
      query: string
      page?: number
      pageSize?: number
    }) => {
      setIsLoading(true)

      try {
        const queryParams =
          page && pageSize ? `?q=${query}&page=${page}&pageSize=${pageSize}` : `?q=${query}`

        const response = await axios.get<IApiResponse>(`${APP_CONFIGS.NEWS_API}${queryParams}`, {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        })

        setNews(response.data.articles)
        setTotalResults(response.data.totalResults)
      } catch (error) {
        const err = error as ErrorWithMessage

        const message = err && err.response ? err.response.data.message : 'An error occurred'

        setLoadingError(message)
      } finally {
        setIsLoading(false)
      }
    },
    [apiKey]
  )

  return { fetchNews, news, totalResults, isLoading, error: loadingError }
}
