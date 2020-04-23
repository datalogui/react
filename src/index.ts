import { useEffect, useMemo, useState } from 'react'
import * as datalog from '@datalogui/datalog'
export function useQuery<OutputSchema>(queryFn: datalog.QueryFn<OutputSchema>) {
  const materializedTable = useMemo(() => datalog.query(queryFn), [queryFn])
  const queryView = useMemo(() => materializedTable.view(), [materializedTable])
  const [counter, setCounter] = useState(0)
  useEffect(() => {
    return materializedTable.onDependencyChange(() => {
      materializedTable.runQuery()
      setCounter(n => n + 1)
    })
  })

  // eslint-disable-next-line
  const allTableData = useMemo(() => queryView.readAllData(), [counter])

  return allTableData
}
