"use client"

import { zodResolver } from "@hookform/resolvers/zod"
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
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "Dani",
      pushupNum: 0,
    },
  })

  function onSubmit(data: FormValues) {
    toast({
      title: "Nyomod fasz",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
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
              <Select onValueChange={field.onChange} defaultValue={"Dani"}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Dani">Dani</SelectItem>
                  <SelectItem value="Donát">Donát</SelectItem>
                  <SelectItem value="Kristóf">Kristóf</SelectItem>
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
        <Button type="submit">Hozzáad</Button>
        <p className="text-xs text-muted-foreground text-center">
          Mai napra eddig: 70 db fekvőtámasz hozzáadva neki: Dani
        </p>
      </form>
    </Form>
  )
}
