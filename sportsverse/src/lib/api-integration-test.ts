/**
 * Backend-Frontend Integration Test
 * Verifies all API endpoints are working correctly
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'

interface TestResult {
  endpoint: string
  status: 'PASS' | 'FAIL'
  statusCode?: number
  error?: string
  dataCount?: number
}

export async function runIntegrationTests(): Promise<TestResult[]> {
  const results: TestResult[] = []

  // Test 1: Live Matches
  try {
    const response = await fetch(`${API_BASE}/cricket/live`, { cache: 'no-store' })
    const data = await response.json()
    results.push({
      endpoint: '/cricket/live',
      status: response.ok ? 'PASS' : 'FAIL',
      statusCode: response.status,
      dataCount: data.data?.length || 0,
    })
  } catch (error) {
    results.push({
      endpoint: '/cricket/live',
      status: 'FAIL',
      error: String(error),
    })
  }

  // Test 2: Series Details
  try {
    const response = await fetch(`${API_BASE}/cricket/series/ipl`, { cache: 'no-store' })
    const data = await response.json()
    results.push({
      endpoint: '/cricket/series/ipl',
      status: response.ok ? 'PASS' : 'FAIL',
      statusCode: response.status,
      dataCount: data.data ? 1 : 0,
    })
  } catch (error) {
    results.push({
      endpoint: '/cricket/series/ipl',
      status: 'FAIL',
      error: String(error),
    })
  }

  // Test 3: Series Matches
  try {
    const response = await fetch(`${API_BASE}/cricket/series/ipl/matches`, { cache: 'no-store' })
    const data = await response.json()
    results.push({
      endpoint: '/cricket/series/ipl/matches',
      status: response.ok ? 'PASS' : 'FAIL',
      statusCode: response.status,
      dataCount: data.data?.length || 0,
    })
  } catch (error) {
    results.push({
      endpoint: '/cricket/series/ipl/matches',
      status: 'FAIL',
      error: String(error),
    })
  }

  // Test 4: Standings
  try {
    const response = await fetch(`${API_BASE}/cricket/standings/ipl`, { cache: 'no-store' })
    const data = await response.json()
    results.push({
      endpoint: '/cricket/standings/ipl',
      status: response.ok ? 'PASS' : 'FAIL',
      statusCode: response.status,
      dataCount: data.data?.length || 0,
    })
  } catch (error) {
    results.push({
      endpoint: '/cricket/standings/ipl',
      status: 'FAIL',
      error: String(error),
    })
  }

  // Test 5: Today's Matches
  try {
    const response = await fetch(`${API_BASE}/cricket/today`, { cache: 'no-store' })
    const data = await response.json()
    results.push({
      endpoint: '/cricket/today',
      status: response.ok ? 'PASS' : 'FAIL',
      statusCode: response.status,
      dataCount: data.data?.length || 0,
    })
  } catch (error) {
    results.push({
      endpoint: '/cricket/today',
      status: 'FAIL',
      error: String(error),
    })
  }

  // Test 6: Upcoming Matches
  try {
    const response = await fetch(`${API_BASE}/cricket/upcoming?days=7`, { cache: 'no-store' })
    const data = await response.json()
    results.push({
      endpoint: '/cricket/upcoming',
      status: response.ok ? 'PASS' : 'FAIL',
      statusCode: response.status,
      dataCount: data.data?.length || 0,
    })
  } catch (error) {
    results.push({
      endpoint: '/cricket/upcoming',
      status: 'FAIL',
      error: String(error),
    })
  }

  // Test 7: Results
  try {
    const response = await fetch(`${API_BASE}/cricket/results?limit=10`, { cache: 'no-store' })
    const data = await response.json()
    results.push({
      endpoint: '/cricket/results',
      status: response.ok ? 'PASS' : 'FAIL',
      statusCode: response.status,
      dataCount: data.data?.length || 0,
    })
  } catch (error) {
    results.push({
      endpoint: '/cricket/results',
      status: 'FAIL',
      error: String(error),
    })
  }

  // Test 8: News
  try {
    const response = await fetch(`${API_BASE}/cricket/news?limit=5`, { cache: 'no-store' })
    const data = await response.json()
    results.push({
      endpoint: '/cricket/news',
      status: response.ok ? 'PASS' : 'FAIL',
      statusCode: response.status,
      dataCount: data.data?.length || 0,
    })
  } catch (error) {
    results.push({
      endpoint: '/cricket/news',
      status: 'FAIL',
      error: String(error),
    })
  }

  return results
}

export function generateReport(results: TestResult[]): string {
  const passed = results.filter((r) => r.status === 'PASS').length
  const failed = results.filter((r) => r.status === 'FAIL').length
  const total = results.length

  let report = `
╔════════════════════════════════════════════════════════════════╗
║      BACKEND-FRONTEND INTEGRATION TEST REPORT                  ║
╚════════════════════════════════════════════════════════════════╝

Test Results: ${passed}/${total} Passed ✓

`

  results.forEach((result) => {
    const icon = result.status === 'PASS' ? '✓' : '✗'
    const statusText = result.status === 'PASS' ? 'PASS' : 'FAIL'
    report += `${icon} ${result.endpoint.padEnd(35)} [${statusText}]`

    if (result.statusCode) {
      report += ` (HTTP ${result.statusCode})`
    }

    if (result.dataCount !== undefined) {
      report += ` - ${result.dataCount} items`
    }

    if (result.error) {
      report += `\n  Error: ${result.error}`
    }

    report += '\n'
  })

  report += `
────────────────────────────────────────────────────────────────
Summary:
- Passed: ${passed}
- Failed: ${failed}
- Success Rate: ${((passed / total) * 100).toFixed(1)}%
────────────────────────────────────────────────────────────────

Frontend API Base: ${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'}
Frontend URL: http://localhost:3000
Backend URL: http://localhost:8000

${failed === 0 ? '✓ All systems operational!' : '⚠ Some endpoints failed. Check backend logs.'}
`

  return report
}
