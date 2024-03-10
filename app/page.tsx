"use client"

import { getPushupsDani, getPushupsDonat, getPushupsKristof } from "@/services/apiPushups"
import { useQuery } from "@tanstack/react-query"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/overview"
import { SelectForm } from "@/components/pushup-form"
import { Spinner } from "@/components/ui/spinner"

export default function IndexPage() {

  const { isLoading: isLoadingDani, data: dataDani, error: errorDani } = useQuery({
    queryKey: ["pushupDani"],
    queryFn: () => getPushupsDani(),
  })
  const { isLoading: isLoadingDonat, data: dataDonat, error: errorDonat } = useQuery({
    queryKey: ["pushupDonat"],
    queryFn: () => getPushupsDonat(),
  })
  const { isLoading: isLoadingKristof, data: dataKristof, error: errorKristof } = useQuery({
    queryKey: ["pushupKristof"],
    queryFn: () => getPushupsKristof(),
  })

  if(isLoadingDani || isLoadingDonat || isLoadingKristof) return <Spinner className="absolute top-1/2 left-1/2" />



  if(dataDani && dataDonat && dataKristof){
    return (
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hónap</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M8 2v4" />
                <path d="M16 2v4" />
                <path d="M21 17V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11Z" />
                <path d="M3 10h18" />
                <path d="M15 22v-4a2 2 0 0 1 2-2h4" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-bold">{new Date().toLocaleString('default', { month: 'long' })}</div>
              <p className="text-xs text-muted-foreground">no pain no gain</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Dani</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1="9" x2="9.01" y1="9" y2="9" />
                <line x1="15" x2="15.01" y1="9" y2="9" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dataDani[0].pushupNum} db</div>
              <p className="text-xs text-muted-foreground">
                +65 db az előző hónaphoz képest
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Donát</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1="9" x2="9.01" y1="9" y2="9" />
                <line x1="15" x2="15.01" y1="9" y2="9" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dataDonat[0].pushupNum} db</div>
              <p className="text-xs text-muted-foreground">
                +12 db az előző hónaphoz képest
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Kristóf</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M16 7h.01" />
                <path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20" />
                <path d="m20 7 2 .5-2 .5" />
                <path d="M10 18v3" />
                <path d="M14 17.75V21" />
                <path d="M7 18a6 6 0 0 0 3.84-10.61" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dataKristof[0].pushupNum}</div>
              <p className="text-xs text-muted-foreground">-</p>
            </CardContent>
          </Card>
        </div>
  
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Összegző</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview />
            </CardContent>
          </Card>
          <Card className="col-span-4 lg:col-span-3 flex justify-center items-center py-6">
            <SelectForm />
          </Card>
        </div>
      </section>
    )
  }


  
}
