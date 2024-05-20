"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z} from "zod"
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
    problemID: z.coerce.number({
        required_error: "Problem ID is required",
        invalid_type_error: "Problem ID must be a number",
    }).int({message:"Problem ID should be an integer"}).positive({message:"Problem ID should be positive"})
})

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export function ProblemForm() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        // defaultValues: {
        //     problemID: 1,
        // },
    })

    const router = useRouter()

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
        let p_id = values.problemID;
        let link = "/problems/" + values.problemID as string;
        // window.location.replace(link);

        router.push(link, { scroll: false })
    }

    return (

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="problemID"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Problem ID</FormLabel>
                            <FormControl>
                                <Input placeholder="Problem ID ( eg 123 , 245 , etc. )" {...field} />
                            </FormControl>
                            <FormDescription>
                                Redirects you to the specific problem whiteboard
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" variant="outline" className="text-black bg-amber-50">Submit</Button>
            </form>
        </Form>
    )
}

