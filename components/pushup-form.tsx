"use client"

import { useState } from "react"
import { getTodayPushups, updatePushup } from "@/services/apiPushups"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

const FormSchema = z.object({
  name: z.string(),
  pushupNum: z.coerce
    .number({
      invalid_type_error: "Számot adj meg!",
    })
    .positive("Add meg a fekvőtámaszok számát!"),
})

type FormValues = z.infer<typeof FormSchema>

export function SelectForm() {
  const [selectedPerson, isSelectedPerson] = useState("Dani")
  const queryClient = useQueryClient()

  const { mutate: updatePushupNum, isLoading: isUpdating } = useMutation({
    mutationFn: ({
      name,
      additionalPushups,
    }: {
      name: string
      additionalPushups: number
    }) => updatePushup(name, additionalPushups),
    onSuccess: () => {
      toast({
        title: "Siker",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-green-600 p-4">
            <code className="text-white">
              Fekvőtámaszok sikeresen hozzáadva!
            </code>
          </pre>
        ),
      }),
        queryClient.invalidateQueries({ queryKey: ["pushupDani"] })
      queryClient.invalidateQueries({ queryKey: ["pushupDonat"] })
      queryClient.invalidateQueries({ queryKey: ["pushupKristof"] })
    },
    onError: (err: TypeError) => {
      toast({
        title: "Nem sikerült a fekvőtámaszok hozzáadása",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-red-600 p-4">
            <code className="text-red">{err.message}</code>
          </pre>
        ),
      })
    },
  })

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "Dani",
      pushupNum: 0,
    },
  })

  function onSubmit(data: FormValues) {
    updatePushupNum({ name: data.name, additionalPushups: data.pushupNum })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Név</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value)
                  isSelectedPerson(value)
                }}
                defaultValue={"Dani"}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Dani">Dani</SelectItem>
                  <SelectItem value="Donat">Donát</SelectItem>
                  <SelectItem value="Kristof">Kristóf</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pushupNum"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fekvőtámasz szám</FormLabel>
              <FormControl>
                <Input placeholder="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isUpdating}>
          Hozzáad
        </Button>
        {/* <p className="text-xs text-muted-foreground text-center">
          Mai napra eddig: {totalPushupsToday} db fekvőtámasz hozzáadva neki:{" "}
          {selectedPerson}
        </p> */}
      </form>
    </Form>
  )
}
