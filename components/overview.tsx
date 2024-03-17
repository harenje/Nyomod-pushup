"use client"

import {
  getMonthlyPushupsDani,
  getMonthlyPushupsDonat,
  getMonthlyPushupsKristof,
} from "@/services/apiPushups"
import { aggregateMonthlyData } from "@/utils/aggregateMonthlyData"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

// const data = [
//   {
//     name: "Mar",
//     total: 2000,
//     dani: 1900,
//     donat: 1850,
//     kristof: 0,
//   },
//   {
//     name: "Apr",
//     total: 2000,
//     dani: 1800,
//     donat: 2000,
//     kristof: 1000,
//   },
//   {
//     name: "Maj",
//     total: 2000,
//     dani: 1800,
//     donat: 1650,
//     kristof: 1500,
//   },
//   {
//     name: "Jun",
//     total: 2000,
//     dani: 1800,
//     donat: 1650,
//     kristof: 1700,
//   },
//   {
//     name: "Jul",
//     total: 2000,
//     dani: 1800,
//     donat: 1650,
//     kristof: 1700,
//   },
//   {
//     name: "Aug",
//     total: 2000,
//     dani: 1800,
//     donat: 1650,
//     kristof: 1500,
//   },
//   {
//     name: "Szept",
//     total: 2000,
//     dani: 1800,
//     donat: 1650,
//     kristof: 1000,
//   },
//   {
//     name: "Okt",
//     total: 2000,
//     dani: 1800,
//     donat: 1650,
//     kristof: 1540,
//   },
//   {
//     name: "Nov",
//     total: 2000,
//     dani: 1800,
//     donat: 1650,
//     kristof: 1000,
//   },
//   {
//     name: "Dec",
//     total: 2000,
//     dani: 2000,
//     donat: 1650,
//     kristof: 1000,
//   },
// ]

// Override console.error
// This is a hack to suppress the warning about missing defaultProps in recharts library as of version 2.12
// @link https://github.com/recharts/recharts/issues/3615
const error = console.error
console.error = (...args: any) => {
  if (/defaultProps/.test(args[0])) return
  error(...args)
}

export function Overview(): JSX.Element {
  const queryClient = useQueryClient()

  const {
    isLoading: isLoadingDani,
    data: dataMonthlyDani,
    error: errorDani,
  } = useQuery({
    queryKey: ["monthlyPushupDani"],
    queryFn: () => getMonthlyPushupsDani(),
  })
  const {
    isLoading: isLoadingDonat,
    data: dataMonthlyDonat,
    error: errorDonat,
  } = useQuery({
    queryKey: ["monthlyPushupDonat"],
    queryFn: () => getMonthlyPushupsDonat(),
  })
  const {
    isLoading: isLoadingKristof,
    data: dataMonthlyKristof,
    error: errorKristof,
  } = useQuery({
    queryKey: ["monthlyPushupKristof"],
    queryFn: () => getMonthlyPushupsKristof(),
  })

  queryClient.invalidateQueries({ queryKey: ["monthlyPushupDani"] })
  queryClient.invalidateQueries({ queryKey: ["monthlyPushupDonat"] })
  queryClient.invalidateQueries({ queryKey: ["monthlyPushupKristof"] })

  if (isLoadingDani || isLoadingDonat || isLoadingKristof)
    return <p>Loading...</p>

  if (errorDani || errorDonat || errorKristof) {
    return <p>Error loading data</p> // Handling errors
  }

  if (dataMonthlyDani && dataMonthlyDonat && dataMonthlyKristof) {
    const transformedData = aggregateMonthlyData(
      dataMonthlyDani,
      dataMonthlyDonat,
      dataMonthlyKristof
    )

    return (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            width={500}
            height={300}
            data={transformedData}
            margin={{
              top: 5,
              right: 20,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#888888" fontSize={12} />
            <YAxis dataKey="total" stroke="#888888" />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="dani"
              fill="#00FFE8"
              activeBar={<Rectangle stroke="white" />}
            />
            <Bar
              dataKey="donat"
              fill="#6527BE"
              activeBar={<Rectangle stroke="white" />}
            />
            <Bar
              dataKey="kristof"
              fill="#F3AA60"
              activeBar={<Rectangle stroke="white" />}
            />
          </BarChart>
        </ResponsiveContainer>
    )
  }
  return <p>fogalmam sincs</p>
}
