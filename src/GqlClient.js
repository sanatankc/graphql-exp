import { print } from 'graphql/language/printer'
import { extractFiles } from 'extract-files'

export default class GqlClient {
  constructor(url, options) {
    this.url = url
    this.options = options
  }

  async query(query, variables) {
    const { headers, ...others } = this.options
    const files = extractFiles(variables)
    let fetchOptions
    const graphqlQuery = JSON.stringify({
      query: print(query),
      variables: variables ? variables : undefined,
    })
    if (files.length) {
      const body = new FormData()
      body.append('operations', graphqlQuery)
      files.forEach(({ path, file }) => body.append(path, file))
      fetchOptions = {
        method: 'POST',
        body,
        ...this.options
      }
    } else {
      fetchOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', ...headers},
        body: graphqlQuery,
        ...others
      }
    }

    const response = await fetch(this.url, fetchOptions)
    const result = await response.json()
    if (response.ok && !result.errors && result.data) {
      return result.data
    } else {
      const errorRes = typeof result === 'string' ? { error: result } : result
      throw new Error(errorRes)
    }
  }
}